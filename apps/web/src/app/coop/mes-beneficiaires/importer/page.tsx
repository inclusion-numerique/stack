import UploadBeneficiaireFileForm from '@app/web/app/coop/mes-beneficiaires/importer/UploadBeneficiaireFileForm'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import BackButton from '@app/web/components/BackButton'

const ImporterPage = () => (
  <CoopPageContainer size={794} className="fr-pt-8v">
    <CoopBreadcrumbs
      parents={[
        {
          label: `Mes bénéficiaires`,
          linkProps: { href: '/coop/mes-beneficiaires' },
        },
      ]}
      currentPage="Importer des bénéficiaires"
    />
    <BackButton href="/coop/mes-beneficiaires">Retour à la liste</BackButton>
    <h1 className="fr-h2 fr-text-title--blue-france fr-mb-2v">
      Importer des bénéficiaires
    </h1>
    <p className="fr-text-mention--grey">
      Vous pouvez importer une liste de bénéficiaires en suivant les étapes
      ci-dessous. Une fois terminé, vous les retrouverez dans la liste de vos
      bénéficiaires.
    </p>
    <hr className="fr-separator-12v" />
    <div className="fr-grid-row fr-grid-row--gutters">
      <div className="fr-col-12 fr-col-md-5">
        <h2 className="fr-h5 fr-text-title--blue-france fr-mb-2v">
          1. Télécharger le fichier
        </h2>
        <p className="fr-text--sm">
          Nous vous invitons à télécharger le fichier vierge ci-contre. Il
          s’agit d’un tableau Excel vide que vous pourrez compléter.
        </p>
      </div>
      <div className="fr-col-12 fr-col-md-7">
        <div className="fr-border fr-border-radius--16 fr-p-8v fr-flex fr-enlarge-link  fr-align-items-center">
          <img
            src="/dsfr/artwork/pictograms/document/document.svg"
            alt=""
            width={64}
          />
          <div className="fr-pl-7v fr-flex-1">
            <h3 className="fr-h6 fr-mb-4v fr-text-title--blue-france">
              Modèle liste bénéficiaires
            </h3>
            <div className="fr-flex align-items-flex-start fr-justify-content-space-between">
              <p className="fr-text--xs fr-text-mention--grey fr-mb-0">
                XLSX&nbsp;-&nbsp;3,6&nbsp;Mo
              </p>
              <a
                className="fr-flex fr-align-items-center fr-text-title--blue-france"
                href="/modeles/coop-numerique_import-beneficiaires.xlsx"
                download
                title="Télécharger le modèle"
              >
                <span className="fr-icon-download-line" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr className="fr-separator-12v" />

    <div className="fr-grid-row fr-grid-row--gutters">
      <div className="fr-col-12 fr-col-md-5">
        <h2 className="fr-h5 fr-text-title--blue-france fr-mb-2v">
          2. Compléter le fichier
        </h2>
        <p className="fr-text--sm">
          Vous pouvez compléter le tableau, chaque ligne correspond à un
          bénéficiaire. Les champs Nom et Prénom sont obligatoires, le champ
          Année de naissance est fortement conseillé afin de ne pas avoir de
          doublons et les autres champs sont optionnels. Vous trouverez un
          exemple en première ligne, que vous pouvez supprimer. Veuillez
          respecter le format de chaque cellule.
        </p>
      </div>
      <div className="fr-col-12 fr-col-md-7 fr-flex fr-align-items-center">
        <div className="fr-width-full fr-border fr-border-radius--8 fr-p-4v">
          <img
            className="fr-width-full fr-border-radius--8"
            src="/modeles/import-beneficiaires.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <hr className="fr-separator-12v" />

    <UploadBeneficiaireFileForm />
  </CoopPageContainer>
)

export default ImporterPage
