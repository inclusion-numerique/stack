import { createSwaggerSpec, type SwaggerOptions } from 'next-swagger-doc'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

export const apiDocsSwaggerOption = {
  apiFolder: 'app/api/v1',
  definition: {
    openapi: '3.0.0',
    info: {
      title: `API ${PublicWebAppConfig.projectTitle}`,
      version: '1.0',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [],
  },
} satisfies SwaggerOptions

export const getApiDocs = async () => {
  const spec = createSwaggerSpec(apiDocsSwaggerOption)
  return spec
}
