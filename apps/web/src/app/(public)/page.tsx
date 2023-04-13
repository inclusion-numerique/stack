import ClosableAlert from '@stack/ui/components/ClosableAlert'

export default async function HomePage() {
  return (
    <div className="fr-container">
      <h2>Yo</h2>
      <ClosableAlert type="info" description="Une desc" title="Bonjour" />
    </div>
  )
}
