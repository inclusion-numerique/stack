export default async function HomePage() {
  const revalidationNonce = Math.floor(Math.random() * 10_000).toString()

  return (
    <>
      <div
        data-revalidation={revalidationNonce}
        className="fr-background-alt--blue-france"
        style={{ position: 'relative' }}
      />
    </>
  )
}
