import React, { useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useDsfrModalIsBound } from '@app/ui/hooks/useDsfrModalIsBound'
import { expect, waitFor, within } from '@storybook/test'
import {
  ActiviteDetailsDynamicModal,
  ActiviteDetailsDynamicModalState,
} from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsDynamicModal'
import ActiviteDetailsModal from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsModal'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'

const Template = ({
  initialState,
}: {
  initialState: ActiviteDetailsDynamicModalState
}) => {
  const loaded = useDsfrModalIsBound(ActiviteDetailsDynamicModal.id)
  useEffect(() => {
    if (loaded) {
      ActiviteDetailsDynamicModal.open()
    }
  }, [loaded])

  return <ActiviteDetailsModal initialState={initialState} />
}

const meta: Meta<typeof ActiviteDetailsModal> = {
  title: 'Activités/Modale détails',
  component: ActiviteDetailsModal,
}

export default meta

type Story = StoryObj<typeof Template>

/**
 * Use play to delay chromatic snapshot until modal is visible
 */
const play = (async ({ canvasElement }) => {
  // Assigns canvas to the component root element
  const canvas = within(canvasElement)
  //   Wait for the below assertion not throwing an error anymore (default timeout is 1000ms)
  await waitFor(() =>
    expect(canvas.findByRole('dialog')).resolves.toBeVisible(),
  )
}) satisfies Story['play']

export const IndividuelInfosMinimum: Story = {
  name: 'Individuel - Infos minimum',
  play,
  render: (args) => <Template {...args} />,
  args: {
    initialState: {
      activite: {
        type: 'individuel',
        cra: {
          id: '1',
          date: new Date('2024-03-22'),
          duree: 90,
          thematiques: [
            'CreerAvecLeNumerique',
            'PrendreEnMainDuMateriel',
            'InsertionProfessionnelle',
          ],
          notes: null,
          beneficiaire: {
            id: '2',
            prenom: null,
            nom: null,
            _count: {
              activites: 5,
            },
            commune: null,
            communeCodePostal: null,
            vaPoursuivreParcoursAccompagnement: null,
            statutSocial: null,
            genre: null,
            trancheAge: null,
          },
          lieuAccompagnement: 'LieuActivite',
          autonomie: null,
          materiel: [],
          lieuAccompagnementDomicileCommune: null,
          lieuAccompagnementDomicileCodeInsee: null,
          lieuAccompagnementDomicileCodePostal: null,
          lieuActivite: {
            id: '1',
            nom: 'Bibliotheque Musee de l’Opera, au fond du couloir à droite',
            commune: 'Paris',
            codePostal: '75006',
          },
          orienteVersStructure: null,
          structureDeRedirection: null,
        },
      },
    },
  },
}

export const IndividuelBeneficiaireSuivi: Story = {
  name: 'Individuel - Bénéficiaire suivi',
  play,
  render: (args) => <Template {...args} />,
  args: {
    initialState: {
      activite: {
        type: 'individuel',
        cra: {
          id: '1',
          date: new Date('2024-03-22'),
          duree: 120,
          thematiques: ['NavigationSurInternet', 'Email'],
          notes: null,
          beneficiaire: {
            id: '2',
            prenom: 'Jean',
            nom: 'Dupont',
            _count: {
              activites: 5,
            },
            commune: null,
            communeCodePostal: null,
            vaPoursuivreParcoursAccompagnement: null,
            statutSocial: 'EnEmploi',
            genre: 'Masculin',
            trancheAge: 'NonCommunique',
          },
          lieuAccompagnement: 'ADistance',
          autonomie: null,
          materiel: [],
          lieuAccompagnementDomicileCommune: null,
          lieuAccompagnementDomicileCodeInsee: null,
          lieuAccompagnementDomicileCodePostal: null,
          lieuActivite: null,
          orienteVersStructure: true,
          structureDeRedirection: 'OperateurOuOrganismeEnCharge',
        },
      },
    },
  },
}

export const IndividuelBeneficiaireAnonyme: Story = {
  name: 'Individuel - Bénéficiaire anonyme',
  play,
  render: (args) => <Template {...args} />,
  args: {
    initialState: {
      activite: {
        type: 'individuel',
        cra: {
          id: '1',
          date: new Date('2024-03-22'),
          duree: 120,
          thematiques: ['NavigationSurInternet', 'Email'],
          beneficiaire: {
            id: '2',
            prenom: null,
            nom: null,
            _count: {
              activites: 0,
            },
            commune: 'Lyon',
            communeCodePostal: '69002',
            vaPoursuivreParcoursAccompagnement: true,
            statutSocial: 'EnEmploi',
            genre: 'Masculin',
            trancheAge: 'QuaranteCinquanteNeuf',
          },
          lieuAccompagnement: 'Domicile',
          autonomie: null,
          materiel: [],
          lieuAccompagnementDomicileCommune: 'Lyon',
          lieuAccompagnementDomicileCodeInsee: '69381',
          lieuAccompagnementDomicileCodePostal: '69002',
          lieuActivite: null,
          orienteVersStructure: true,
          structureDeRedirection: 'OperateurOuOrganismeEnCharge',
          notes:
            '<p>Lörem ipsum ladeniliga douche <strong>plaledes</strong>. Nining son. Mipära kavun joskap juling lanar. Segyde snålsurfa då jevis. Dorade preng posad. Spefuv ter i kvasitiskap då mobilblottare dir. Häbel epihet i tegt. Ultrar. Digt hän. Polytt doskapet tempopatologi. Use betårta, tena. Biktiga pojuren.</p>' +
            '<p>Segyde snålsurfa då jevis. <strong>Dorade preng posad</strong>. Spefuv ter i kvasitiskap då mobilblottare dir. Häbel epihet i tegt. Ultrar. Digt hän. Polytt doskapet tempopatologi. Use betårta, tena. Biktiga pojuren</p>',
        },
      },
    },
  },
}

export const CollectifInfosRepliees: Story = {
  name: 'Collectif - Infos participants repliées',
  play,
  render: (args) => <Template {...args} />,
  args: {
    initialState: {
      activite: {
        type: 'collectif',
        cra: {
          id: '1',
          date: new Date('2024-03-22'),
          duree: 120,
          thematiques: ['NavigationSurInternet', 'Email'],
          participantsAnonymes: { ...participantsAnonymesDefault, id: '5' },
          participants: [
            {
              beneficiaire: {
                id: '3',
                prenom: 'Marie',
                nom: 'Durand',
              },
            },
            {
              beneficiaire: {
                id: '2',
                prenom: 'Jean',
                nom: 'Dupont',
              },
            },
          ],
          niveau: 'Debutant',
          lieuAtelier: 'Autre',
          lieuAccompagnementAutreCommune: 'Lyon',
          lieuAccompagnementAutreCodeInsee: '69381',
          lieuAccompagnementAutreCodePostal: '69002',
          titreAtelier: 'Atelier de découverte de la vacuité de toute chose',
          lieuActivite: null,
          notes:
            '<p>Lörem ipsum ladeniliga douche <strong>plaledes</strong>. Nining son. Mipära kavun joskap juling lanar. Segyde snålsurfa då jevis. Dorade preng posad. Spefuv ter i kvasitiskap då mobilblottare dir. Häbel epihet i tegt. Ultrar. Digt hän. Polytt doskapet tempopatologi. Use betårta, tena. Biktiga pojuren.</p>' +
            '<p>Segyde snålsurfa då jevis. <strong>Dorade preng posad</strong>. Spefuv ter i kvasitiskap då mobilblottare dir. Häbel epihet i tegt. Ultrar. Digt hän. Polytt doskapet tempopatologi. Use betårta, tena. Biktiga pojuren</p>',
        },
      },
    },
  },
}

export const CollectifInfosDepliees: Story = {
  name: 'Collectif - Infos participants dépliées',
  play: async (playContext) => {
    await play(playContext)
    // Get the role button with class .fr-accordion__btn and click it
    const { canvasElement } = playContext

    const canvas = within(canvasElement)
    const buttons = canvas.getAllByRole('button')
    const button = buttons.find((element) =>
      element.classList.contains('fr-accordion__btn'),
    )
    if (button) {
      button.click()
    } else {
      throw new Error('Button with class .fr-accordion__btn not found')
    }
  },
  render: (args) => <Template {...args} />,
  args: {
    initialState: {
      activite: {
        type: 'collectif',
        cra: {
          id: '1',
          date: new Date('2024-03-22'),
          duree: 120,
          thematiques: ['NavigationSurInternet', 'Email'],
          participantsAnonymes: {
            ...participantsAnonymesDefault,

            total: 40,

            genreFeminin: 15,
            genreMasculin: 2,
            genreNonCommunique: 23,

            trancheAgeVingtCinqTrenteNeuf: 40,

            statutSocialNonCommunique: 40,

            id: '5',
          },
          participants: [
            {
              beneficiaire: {
                id: '3',
                prenom: 'Marie',
                nom: 'Durand',
              },
            },
            {
              beneficiaire: {
                id: '2',
                prenom: 'Jean',
                nom: 'Dupont',
              },
            },
          ],
          niveau: 'Debutant',
          lieuAtelier: 'LieuActivite',
          lieuAccompagnementAutreCommune: null,
          lieuAccompagnementAutreCodeInsee: null,
          lieuAccompagnementAutreCodePostal: null,
          titreAtelier: null,
          lieuActivite: {
            id: '1',
            nom: 'Bibliotheque Musee de l’Opera, au fond du couloir à droite',
            commune: 'Paris',
            codePostal: '75006',
          },
          notes: null,
        },
      },
    },
  },
}

export const ConfirmationSuppression: Story = {
  name: 'Collectif - Confirmation de suppression',
  play: async (playContext) => {
    await play(playContext)
    // Get the role button with class .fr-accordion__btn and click it
    const { canvasElement } = playContext

    const canvas = within(canvasElement)
    const buttons = canvas.getAllByRole('button')
    const button = buttons.find((element) => element.title === 'Supprimer')
    if (button) {
      button.click()
    } else {
      throw new Error('Delete button not found')
    }
  },
  render: (args) => <Template {...args} />,
  args: {
    initialState: {
      activite: {
        type: 'collectif',
        cra: {
          id: '1',
          date: new Date('2024-03-22'),
          duree: 120,
          thematiques: ['NavigationSurInternet', 'Email'],
          participantsAnonymes: {
            ...participantsAnonymesDefault,

            total: 40,

            genreNonCommunique: 40,

            trancheAgeVingtCinqTrenteNeuf: 4,
            trancheAgeMineur: 2,
            trancheAgeDixHuitVingtQuatre: 10,
            trancheAgeSoixanteSoixanteNeuf: 12,
            trancheAgeSoixanteDixPlus: 3,
            trancheAgeNonCommunique: 9,

            statutSocialRetraite: 2,
            statutSocialNonCommunique: 38,

            id: '5',
          },
          participants: [
            {
              beneficiaire: {
                id: '3',
                prenom: 'Marie',
                nom: 'Durand',
              },
            },
            {
              beneficiaire: {
                id: '2',
                prenom: 'Jean',
                nom: 'Dupont',
              },
            },
          ],
          niveau: 'Debutant',
          lieuAtelier: 'LieuActivite',
          lieuAccompagnementAutreCommune: null,
          lieuAccompagnementAutreCodeInsee: null,
          lieuAccompagnementAutreCodePostal: null,
          titreAtelier: null,
          lieuActivite: {
            id: '1',
            nom: 'Bibliotheque Musee de l’Opera, au fond du couloir à droite',
            commune: 'Paris',
            codePostal: '75006',
          },
          notes: null,
        },
      },
    },
  },
}

export const DemarcheBeneficiaireSuivi: Story = {
  name: 'Demarche - Bénéficiaire suivi',
  play,
  render: (args) => <Template {...args} />,
  args: {
    initialState: {
      activite: {
        type: 'demarche',
        cra: {
          id: '1',
          date: new Date('2024-03-22'),
          duree: 120,
          thematiques: ['TransportsMobilite', 'TravailFormation'],
          notes: null,
          precisionsDemarche: 'Demande de renouvellement de carte d’identité',
          beneficiaire: {
            id: '2',
            prenom: 'Jean',
            nom: 'Dupont',
            _count: {
              activites: 5,
            },
            commune: null,
            communeCodePostal: null,
            vaPoursuivreParcoursAccompagnement: null,
            statutSocial: 'EnEmploi',
            genre: 'Masculin',
            trancheAge: 'NonCommunique',
          },
          lieuAccompagnement: 'ADistance',
          autonomie: null,
          lieuAccompagnementDomicileCommune: null,
          lieuAccompagnementDomicileCodeInsee: null,
          lieuAccompagnementDomicileCodePostal: null,
          lieuActivite: null,
          degreDeFinalisation: 'OrienteVersStructure',
          structureDeRedirection: 'AideAuxDemarchesAdministratives',
        },
      },
    },
  },
}

export const DemarcheBeneficiaireAnonyme: Story = {
  name: 'Demarche - Bénéficiaire anonyme',
  play,
  render: (args) => <Template {...args} />,
  args: {
    initialState: {
      activite: {
        type: 'demarche',
        cra: {
          id: '1',
          date: new Date('2024-03-22'),
          duree: 120,
          thematiques: [
            'ArgentImpots',
            'PapiersElectionsCitoyennete',
            'Justice',
          ],
          precisionsDemarche: null,
          beneficiaire: {
            id: '2',
            prenom: null,
            nom: null,
            _count: {
              activites: 0,
            },
            commune: 'Lyon',
            communeCodePostal: '69002',
            vaPoursuivreParcoursAccompagnement: true,
            statutSocial: 'EnEmploi',
            genre: 'Masculin',
            trancheAge: 'QuaranteCinquanteNeuf',
          },
          lieuAccompagnement: 'Domicile',
          autonomie: 'EntierementAccompagne',
          lieuAccompagnementDomicileCommune: 'Lyon',
          lieuAccompagnementDomicileCodeInsee: '69381',
          lieuAccompagnementDomicileCodePostal: '69002',
          lieuActivite: null,
          degreDeFinalisation: 'AFinaliserEnAutonomie',
          structureDeRedirection: null,
          notes:
            '<p>Lörem ipsum ladeniliga douche <strong>plaledes</strong>. Nining son. Mipära kavun joskap juling lanar. Segyde snålsurfa då jevis. Dorade preng posad. Spefuv ter i kvasitiskap då mobilblottare dir. Häbel epihet i tegt. Ultrar. Digt hän. Polytt doskapet tempopatologi. Use betårta, tena. Biktiga pojuren.</p>' +
            '<p>Segyde snålsurfa då jevis. <strong>Dorade preng posad</strong>. Spefuv ter i kvasitiskap då mobilblottare dir. Häbel epihet i tegt. Ultrar. Digt hän. Polytt doskapet tempopatologi. Use betårta, tena. Biktiga pojuren</p>',
        },
      },
    },
  },
}
