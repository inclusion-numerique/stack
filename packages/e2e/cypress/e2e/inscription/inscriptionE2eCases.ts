/* eslint unicorn/prevent-abbreviations: 0 */

import type { CreateUserInput } from '@app/e2e/tasks/handlers/user.tasks'

export const conseillersV1ThatShouldSignupAsConseiller = {
  a: {
    email: 'sbousquet@departement06.fr',
    firstName: 'Conseiller numérique',
    lastName: 'A',
    emailVerified: new Date(),
  },
  b: {
    email: 'sonia.hamila@saintlaurentduvar.fr',
    firstName: 'Conseiller numérique',
    lastName: 'B',
    emailVerified: new Date(),
  },
  c: {
    email: 'nketficharif@lyonmetropole-mmie.fr',
    firstName: 'Conseiller numérique',
    lastName: 'C',
    emailVerified: new Date(),
  },
} satisfies Record<string, CreateUserInput>

export const coordinateursV1ThatShouldSignupAsCoordinateur = {
  a: {
    email: 'cberge@hubdusud.fr',
    firstName: 'Coordinateur',
    lastName: 'A',
    emailVerified: new Date(),
  },
}
