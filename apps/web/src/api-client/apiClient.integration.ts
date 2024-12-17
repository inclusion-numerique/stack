import { prismaClient } from '@app/web/prismaClient'
import { ApiClientScope } from '@prisma/client'
import {
  authenticateApiCient,
  createApiClient,
  CreateApiClientOutput,
  rotateApiClientSecret,
} from '@app/web/api-client/apiClient'

describe('apiClient', () => {
  const testClient = {
    id: '212c5a27-c409-4657-817f-371928f59046',
    name: 'test-integration-client',
    scopes: [ApiClientScope.Statistiques],
  }

  const testClientToRotate = {
    id: 'af10da01-e63e-421a-856a-efeb94948519',
    name: 'test-integration-client-to-rotate',
    scopes: [ApiClientScope.Statistiques, ApiClientScope.Activites],
  }

  let createdClient: CreateApiClientOutput

  beforeAll(async () => {
    // Clean up the database before starting the tests
    await prismaClient.apiClient.deleteMany({
      where: {
        id: {
          in: [testClient.id, testClientToRotate.id],
        },
      },
    })
    createdClient = await createApiClient(testClient)
  })

  afterAll(async () => {
    // Close the Prisma Client connection when the tests are done
    await prismaClient.$disconnect()
  })

  describe('createApiClient', () => {
    it('should create a new ApiClient and store the hashed secret', async () => {
      expect(createdClient.id).toBe(testClient.id)
      expect(createdClient.name).toBe(testClient.name)
      expect(createdClient.scopes).toEqual(testClient.scopes)
      expect(createdClient.secret.length).toBeGreaterThan(0)

      const savedClient = await prismaClient.apiClient.findUniqueOrThrow({
        where: { id: createdClient.id },
      })

      expect(savedClient.id).toBe(createdClient.id)
      expect(savedClient.name).toBe(createdClient.name)
      expect(savedClient.scopes).toEqual(createdClient.scopes)
      expect(savedClient.secretHash).not.toBe(createdClient.secret) // Secret should be hashed in the DB,
    })
  })

  describe('authenticateApiClient', () => {
    it('should return null for an invalid clientId', async () => {
      // Act
      const result = await authenticateApiCient(
        'nonexistentClientId',
        'someSecret',
      )

      // Assert
      expect(result).toBeNull()
    })

    it('should authenticate an ApiClient with correct clientId and secret', async () => {
      const authenticatedClient = await authenticateApiCient(
        createdClient.id,
        createdClient.secret,
      )

      expect(authenticatedClient).toEqual(
        expect.objectContaining({
          id: createdClient.id,
          name: createdClient.name,
          secretHash: createdClient.secretHash,
        }),
      )
    })

    it('should return null for an invalid secret', async () => {
      const invalidClient = await authenticateApiCient(
        createdClient.id,
        'wrongSecret',
      )

      expect(invalidClient).toBeNull()
    })

    it('should return null if the ApiClient is outside the valid date range', async () => {
      // Update validUntil to be in the past
      await prismaClient.apiClient.update({
        where: { id: createdClient.id },
        data: {
          validUntil: new Date(Date.now() - 1000 * 60 * 60), // expired 1 hour ago
        },
      })

      const result = await authenticateApiCient(
        createdClient.id,
        createdClient.secret,
      )

      expect(result).toBeNull()
    })
  })

  describe('rotateApiClientSecret', () => {
    it('should rotate the secret of an ApiClient', async () => {
      const clientToRotate = await createApiClient(testClientToRotate)

      // Act
      const rotatedClient = await rotateApiClientSecret({
        clientId: clientToRotate.id,
      })

      // Assert
      expect(rotatedClient.clientId).toBe(clientToRotate.id)
      expect(rotatedClient.secret).not.toBe(clientToRotate.secret)
      expect(rotatedClient.secretHash).not.toBe(clientToRotate.secretHash)
    })
  })
})
