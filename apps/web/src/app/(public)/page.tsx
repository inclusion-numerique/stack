import { redirect } from 'next/navigation'

export const revalidate = 0

const HomePage = () => {
  redirect('/connexion/suivant')

  return null
}

export default HomePage
