export const DescriptionView = ({
  typologies,
  presentationResume,
  presentationDetail,
}: {
  typologies?: string[] | null
  presentationResume?: string | null
  presentationDetail?: string | null
}) => (
  <div className="fr-flex fr-direction-column fr-flex-gap-6v">
    <div>
      <span className="fr-text-mention--grey">Typologie</span>
      <div className="fr-text--medium" data-testid="description-typologies">
        {(typologies?.length ?? 0) > 0
          ? typologies?.join(', ')
          : 'Non renseigné'}
      </div>
    </div>
    <div>
      <span className="fr-text-mention--grey">Résumé</span>
      <div
        className="fr-text--medium"
        data-testid="description-presentation-resume"
      >
        {(presentationResume?.length ?? 0) > 0
          ? presentationResume
          : 'Non renseignée'}
      </div>
    </div>
    <div>
      <span className="fr-text-mention--grey">Présentation</span>
      <div
        className="fr-text--medium"
        data-testid="description-presentation-detail"
      >
        {presentationDetail ? (
          <div
            dangerouslySetInnerHTML={{
              __html: presentationDetail,
            }}
          />
        ) : (
          'Non renseigné'
        )}
      </div>
    </div>
  </div>
)
