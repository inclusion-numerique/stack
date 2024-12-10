import { prismaClient } from '@app/web/prismaClient'
import { ApiClientScope } from '@prisma/client'
import {
  authenticateApiCient,
  createApiClient,
} from '@app/web/api-client/apiClient'
import { generateRandomSecret } from '@app/web/security/generateRandomSecret'
import { hashSecret } from '@app/web/security/hashSecret'

describe('apiClient', () => {
  beforeAll(async () => {
    // Clean up the database before starting the tests
    await prismaClient.apiClient.deleteMany({})
  })

  afterAll(async () => {
    // Close the Prisma Client connection when the tests are done
    await prismaClient.$disconnect()
  })

  describe('createApiClient', () => {
    it('should create a new ApiClient and store the hashed secret', async () => {
      // Arrange
      const name = 'Test Client'
      const scopes = [ApiClientScope.Statistiques]

      // Act
      const createdClient = await createApiClient({
        name,
        scopes,
      })

      // Assert
      expect(createdClient).toHaveProperty('id')
      expect(createdClient).toHaveProperty('secret') // The plain secret returned
      expect(createdClient.secret.length).toBeGreaterThan(0)

      const savedClient = await prismaClient.apiClient.findUnique({
        where: { id: createdClient.id },
      })

      expect(savedClient).toEqual(
        expect.objectContaining({
          id: createdClient.id,
          name,
          scopes,
        }),
      )
      expect(savedClient?.secret).not.toBe(createdClient.secret) // Secret should be hashed in the DB,
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
      // Arrange
      const plainSecret = generateRandomSecret()
      const hashedSecret = hashSecret(plainSecret)
      const now = new Date()

      // Create a valid ApiClient in the database
      const validClient = await prismaClient.apiClient.create({
        data: {
          name: 'Valid Client',
          secret: hashedSecret,
          validFrom: new Date(now.getTime() - 1000 * 60 * 60), // validFrom 1 hour ago
          validUntil: new Date(now.getTime() + 1000 * 60 * 60), // validUntil 1 hour from now
          scopes: [ApiClientScope.Statistiques],
        },
      })

      const authenticatedClient = await authenticateApiCient(
        validClient.id,
        plainSecret,
      )

      expect(authenticatedClient).toEqual(
        expect.objectContaining({ id: validClient.id }),
      )
    })

    it('should return null for an invalid secret', async () => {
      // Arrange
      const plainSecret = generateRandomSecret()
      const hashedSecret = hashSecret(plainSecret)
      const now = new Date()

      // Create a valid ApiClient in the database
      const validClient = await prismaClient.apiClient.create({
        data: {
          name: 'Client with Invalid Secret Test',
          secret: hashedSecret,
          validFrom: new Date(now.getTime() - 1000 * 60 * 60),
          validUntil: new Date(now.getTime() + 1000 * 60 * 60),
          scopes: [ApiClientScope.Statistiques],
        },
      })

      // Act
      const invalidClient = await authenticateApiCient(
        validClient.id,
        'wrongSecret',
      )

      // Assert
      expect(invalidClient).toBeNull()
    })

    it('should return null if the ApiClient is outside the valid date range', async () => {
      // Arrange
      const plainSecret = generateRandomSecret()
      const hashedSecret = hashSecret(plainSecret)

      // Create an ApiClient that is no longer valid
      const expiredClient = await prismaClient.apiClient.create({
        data: {
          name: 'Expired Client',
          secret: hashedSecret,
          validFrom: new Date(Date.now() - 1000 * 60 * 60 * 24), // validFrom yesterday
          validUntil: new Date(Date.now() - 1000 * 60 * 60), // expired 1 hour ago
          scopes: [ApiClientScope.Statistiques],
        },
      })

      // Act
      const result = await authenticateApiCient(expiredClient.id, plainSecret)

      // Assert
      expect(result).toBeNull()
    })
  })
})
