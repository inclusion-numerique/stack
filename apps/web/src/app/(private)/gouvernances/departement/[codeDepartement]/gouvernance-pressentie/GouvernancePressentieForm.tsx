import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Notice from '@codegouvfr/react-dsfr/Notice'
import RadioFormField from '@app/ui/components/Form/RadioFormField'
import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import Link from 'next/link'
import InputFormField from '@app/ui/components/Form/InputFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import React from 'react'
import {
  GouvernancePressentieData,
  GouvernancePressentieValidation,
  perimetreOptions,
} from '@app/web/gouvernance/GouvernancePressentie'
import WhiteCard from '@app/web/ui/WhiteCard'
import RedAsterisk from '@app/web/ui/RedAsterisk'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { limiteModificationDesGouvernancesPressenties } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance-pressentie/gouvernancePressentieMetadata'
import SiretInputInfo from '@app/web/components/SiretInputInfo'

const GouvernancePressentieForm = ({
  gouvernancePressentie,
  optionsCollectivitesPorteur,
}: {
  // If editing existing
  gouvernancePressentie?: DefaultValues<GouvernancePressentieData>
  optionsCollectivitesPorteur: {
    label: string
    options: { label: string; value: string }[]
  }[]
}) => {
  const { control, handleSubmit } = useForm<GouvernancePressentieData>({
    resolver: zodResolver(GouvernancePressentieValidation),
    defaultValues: gouvernancePressentie ?? {},
  })

  const onSubmit = (data: GouvernancePressentieData) => {
    console.log('DATA', data)
  }

  return (
    <WhiteCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="fr-text-title--blue-france fr-mb-2v">
          Gouvernances et porteurs pressentis des feuilles de route au sein de
          votre département
        </h3>
        <p className="fr-text--sm fr-text--medium fr-mb-6v">
          Les champs avec <RedAsterisk /> sont obligatoires
        </p>
        <Notice
          className="fr-mb-10v"
          title={`Proposition modifiable jusqu’au ${dateAsDay(
            limiteModificationDesGouvernancesPressenties,
          )}`}
        />
        <h6 className="fr-mb-4v">Périmètre de la gouvernance</h6>
        <RadioFormField
          control={control}
          asterisk
          label="Quel est le périmètre géographique de la gouvernance ?"
          path="perimetre"
          options={perimetreOptions}
        />
        <hr className="fr-separator-10v" />
        <h6 className="fr-mb-4v">Porteur de la feuille de route</h6>
        <CustomSelectFormField
          label="Qui sera le porteur de la feuille de route ?"
          path="porteurCode"
          control={control}
          options={optionsCollectivitesPorteur}
        />
        <hr className="fr-separator-10v" />
        <h6 className="fr-mb-4v">Périmètre de la gouvernance</h6>
        <p className="fr-mb-8v">
          La phase de déploiement du dispositif Conseiller numérique laisse
          place à une phase de structuration où le diagnostic des besoins et
          l’accompagnement des conseillers numériques au niveau local peut
          permettre d’organiser l’action de la médiation numérique, et de
          l’intégrer aux politiques publiques territoriales. C’est en ce sens
          qu’un appel à candidatures à été lancé pour identifier des structures
          souhaitant avoir une action de coordination de l’action des
          conseillers numériques et des médiateurs numériques de leur territoire
          :
          <Link
            href="https://societenumerique.gouv.fr/fr/actualite/appel-a-candidatures-conseillers-numeriques-coordinateurs/"
            target="_blank"
          >
            https://societenumerique.gouv.fr/fr/actualite/appel-a-candidatures-conseillers-numeriques-coordinateurs/
          </Link>
          . Ces projets de coordination doivent s’articuler avec les projets de
          gouvernances pressenties.
          <br />
          <br />
          Par ailleurs, l’instruction des candidatures doit être faite sur la
          <Link
            href="https://admin.conseiller-numerique.gouv.fr/login?role=prefet"
            target="_blank"
          >
            plateforme dédiée au dispositif Conseiller Numérique
          </Link>{' '}
          avant le 10 décembre 2023.
          <br />
          <br />
          Veuillez renseigner quelle collectivité/structure va recruter un
          coordinateur Conseillers Numériques au sein de la gouvernance :
        </p>
        {/* TODO LIST WITH ADD / REMOVE */}
        <InputFormField
          control={control}
          path="siretsRecruteursCoordinateurs.0"
          label="SIRET de la collectivité/structure"
          asterisk
          info={<SiretInputInfo />}
        />
        <hr className="fr-separator-10v" />
        <h6 className="fr-mb-4v">Note de contexte</h6>
        {/* TODO ADD RICH FORM FIELD */}
        <InputFormField
          control={control}
          asterisk
          path="noteDeContexte"
          label="Précisez, au sein d'une note qualitative, la composition pressentie de la gouvernance dans votre département et les éventuelles difficultés que vous rencontreriez dans les échanges avec les collectivités territoriales et leurs groupements."
        />
        <div className="fr-btns-group fr-mt-10v">
          <Button type="submit">Confirmer et envoyer</Button>
        </div>
      </form>
    </WhiteCard>
  )
}

export default GouvernancePressentieForm
