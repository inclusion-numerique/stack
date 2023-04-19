import { Fn, TerraformStack } from 'cdktf'
import { Construct } from 'constructs'
import { ScalewayProvider } from '@stack/scaleway/provider'
import { RdbDatabase } from '@stack/scaleway/rdb-database'
import { DataScalewayRdbInstance } from '@stack/scaleway/data-scaleway-rdb-instance'
import { RdbUser } from '@stack/scaleway/rdb-user'
import { RdbPrivilege } from '@stack/scaleway/rdb-privilege'
import { DataScalewayContainerNamespace } from '@stack/scaleway/data-scaleway-container-namespace'
import { Container } from '@stack/scaleway/container'
import { WebCdkOutput } from '@stack/cdk/getCdkOutput'
import { DataScalewayDomainZone } from '@stack/scaleway/data-scaleway-domain-zone'
import { DomainRecord, DomainRecordConfig } from '@stack/scaleway/domain-record'
import { ContainerDomain } from '@stack/scaleway/container-domain'
import {
  computeBranchNamespace,
  createPreviewSubdomain,
  namespacer,
} from '@stack/cdk/utils'
import { ObjectBucket } from '@stack/scaleway/object-bucket'
import {
  containerNamespaceName,
  databaseInstanceName,
  mainDomain,
  mainRootDomain,
  mainSubdomain,
  previewDomain,
  previewRootDomain,
  previewSubdomain,
  projectSlug,
  projectTitle,
  region,
} from '@stack/config/config'
import { environmentVariablesFromList } from '@stack/cdk/environmentVariable'
import { createOutput } from '@stack/cdk/output'
import { terraformBackend } from '@stack/cdk/terraformBackend'

export const webAppStackVariables = [
  'WEB_CONTAINER_IMAGE',
  'SCW_DEFAULT_ORGANIZATION_ID',
  'SCW_PROJECT_ID',
] as const
export const webAppStackSensitiveVariables = [
  'SCW_ACCESS_KEY',
  'SCW_SECRET_KEY',
  'DATABASE_PASSWORD',
] as const

/**
 * This stack represents the web app for a given branch (namespace).
 * It can be deployed for each branch.
 */
export class WebAppStack extends TerraformStack {
  constructor(scope: Construct, branch: string) {
    super(scope, 'web')

    const namespace = computeBranchNamespace(branch)

    const namespaced = namespacer(namespace)

    // ⚠️ When calling this function, do not forget to update typings in src/getCdkOutput.ts
    const output = createOutput<WebCdkOutput>(this)

    const isMain = namespace === 'main'

    const { hostname, subdomain } = isMain
      ? { hostname: mainDomain, subdomain: '' }
      : createPreviewSubdomain(namespace, previewDomain)

    const environmentVariables = environmentVariablesFromList(
      this,
      webAppStackVariables,
      { sensitive: false },
    )
    const sensitiveEnvironmentVariables = environmentVariablesFromList(
      this,
      webAppStackSensitiveVariables,
      { sensitive: true },
    )

    // Configuring provider that will be used for the rest of the stack
    new ScalewayProvider(this, 'provider', {
      region,
      accessKey: sensitiveEnvironmentVariables.SCW_ACCESS_KEY.value,
      secretKey: sensitiveEnvironmentVariables.SCW_SECRET_KEY.value,
      organizationId: environmentVariables.SCW_DEFAULT_ORGANIZATION_ID.value,
      projectId: environmentVariables.SCW_PROJECT_ID.value,
    })

    // State of deployed infrastructure for each branch will be stored in the
    // same 'stack-terraform-state' bucket, with namespace in .tfstate filename.
    terraformBackend(this, `web-${namespace}`)

    // The database instance is shared for each namespace/branch we refer to it (DataScaleway)
    // but do not manage it through this stack
    const databaseInstance = new DataScalewayRdbInstance(this, 'dbInstance', {
      name: databaseInstanceName,
    })

    output('databaseHost', databaseInstance.endpointIp)
    output('databasePort', databaseInstance.endpointPort)

    const databaseName = namespaced(projectSlug)
    const databaseUser = namespaced(projectSlug)
    const databasePasswordVariable =
      sensitiveEnvironmentVariables.DATABASE_PASSWORD

    const rdbDatabaseUser = new RdbUser(this, 'databaseUser', {
      name: databaseUser,
      instanceId: databaseInstance.instanceId,
      password: databasePasswordVariable.value,
    })

    const database = new RdbDatabase(this, 'database', {
      name: databaseName,
      instanceId: databaseInstance.instanceId,
    })

    output('databaseUser', databaseUser)
    output('databaseName', databaseName)

    new RdbPrivilege(this, 'databasePrivilege', {
      instanceId: databaseInstance.instanceId,
      databaseName,
      userName: databaseUser,
      permission: 'all',
      dependsOn: [database, rdbDatabaseUser],
    })

    const documentsBucket = new ObjectBucket(this, 'documents', {
      name: namespaced(`${projectSlug}-documents`),
      corsRule: [
        {
          allowedHeaders: ['*'],
          allowedMethods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
          maxAgeSeconds: 3000,
          exposeHeaders: ['Etag'],
          allowedOrigins: [`https://${hostname}`],
        },
      ],
    })

    output('documentsBucketName', documentsBucket.name)
    output('documentsBucketEndpoint', documentsBucket.endpoint)

    const containerNamespace = new DataScalewayContainerNamespace(
      this,
      'containerNamespace',
      { name: containerNamespaceName },
    )

    const emailFromAddress = isMain
      ? `bot@${mainDomain}`
      : `bot+${namespace}@${mainDomain}`

    const emailFromName = isMain
      ? projectTitle
      : `[${namespace}] ${projectTitle}`

    const databaseUrl = Fn.format('postgres://%s:%s@%s:%s/%s', [
      databaseUser,
      databasePasswordVariable.value,
      databaseInstance.endpointIp,
      databaseInstance.endpointPort,
      databaseName,
    ]) as string

    // Changing the name will recreate a new container
    // The names fails with max length so we shorten it
    const maxContainerNameLength = 34
    const containerName =
      namespace.length > maxContainerNameLength
        ? namespace.slice(0, Math.max(0, maxContainerNameLength))
        : namespace

    const container = new Container(this, 'webContainer', {
      namespaceId: containerNamespace.namespaceId,
      registryImage: environmentVariables.WEB_CONTAINER_IMAGE.value,
      environmentVariables: {
        EMAIL_FROM_ADDRESS: emailFromAddress,
        EMAIL_FROM_NAME: emailFromName,
        STACK_WEB_IMAGE: environmentVariables.WEB_CONTAINER_IMAGE.value,
        DOCUMENTS_BUCKET: documentsBucket.name,
        BASE_URL: hostname,
        BRANCH: branch,
        NAMESPACE: namespace,
        // This env variable is reserved at the level of container namespace. We inject it here even if its shared.
        SCW_DEFAULT_REGION: region,
        NEXT_PUBLIC_SENTRY_ENVIRONMENT: namespace,
      },
      secretEnvironmentVariables: {
        DATABASE_URL: databaseUrl,
      },
      name: containerName,
      minScale: isMain ? 2 : namespace === 'dev' ? 1 : 0,
      maxScale: isMain ? 5 : 1,
      cpuLimit: 1120, // mVPCU
      memoryLimit: 2048, // mB
      deploy: true,
    })

    const domainZone = new DataScalewayDomainZone(this, 'dnsZone', {
      domain: isMain ? mainRootDomain : previewRootDomain,
      subdomain: isMain ? mainSubdomain : previewSubdomain,
    })

    const webDnsRecordConfig: DomainRecordConfig = subdomain
      ? {
          type: 'CNAME',
          dnsZone: domainZone.id,
          name: subdomain,
          data: `${container.domainName}.`,
          ttl: 60 * 5,
        }
      : {
          // Root domain record cannot be CNAME
          type: 'ALIAS',
          dnsZone: domainZone.id,
          name: '',
          data: `${container.domainName}.`,
          ttl: 60 * 5,
        }

    const webDnsRecord = new DomainRecord(
      this,
      'webDnsRecord',
      webDnsRecordConfig,
    )

    new ContainerDomain(this, 'webContainerDomain', {
      containerId: container.id,
      hostname,
      dependsOn: [webDnsRecord, container],
    })

    output('webBaseUrl', hostname)
    output('containerDomainName', container.domainName)
    output('databaseUrl', databaseUrl, 'sensitive')
    output('databasePassword', databasePasswordVariable.value, 'sensitive')
    output(
      'webContainerStatus',
      container.status as WebCdkOutput['webContainerStatus'],
    )
    output('webContainerId', container.id)
    output('webContainerImage', environmentVariables.WEB_CONTAINER_IMAGE.value)
  }
}
