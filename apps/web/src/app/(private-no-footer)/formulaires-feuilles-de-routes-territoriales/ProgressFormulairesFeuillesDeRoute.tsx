import Progress from '@app/ui/components/Progress'

const totalSteps = 5

const ProgressFormulairesFeuillesDeRoute = ({
  progression,
  currentTitle,
  nextTitle,
}: {
  progression: number
  currentTitle: string
  nextTitle?: string
}) => (
  <Progress
    progression={progression}
    currentTitle={currentTitle}
    nextTitle={nextTitle}
    steps={totalSteps}
    className="fr-my-12v"
  />
)

export default ProgressFormulairesFeuillesDeRoute
