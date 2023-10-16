import HomeCategories from '@app/web/app/(public)/HomeCategories'
import Banner from '@app/web/app/(public)/Banner'
import HomeInfo from '@app/web/app/(public)/HomeInfo'

export const revalidate = 0

const HomePage = () => (
  <>
    <Banner />
    <HomeCategories />
    <HomeInfo />
  </>
)

export default HomePage
