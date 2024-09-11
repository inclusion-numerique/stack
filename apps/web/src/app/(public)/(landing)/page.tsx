import { Contexte } from './_components/Contexte'
import { Faq } from './_components/Faq'
import { Fonctionnalites } from './_components/Fonctionnalites'
import { Jumbotron } from './_components/Jumbotron'
import { Outils } from './_components/Outils'
import { QuiSommesNous } from './_components/QuiSommesNous'
import Webinaire from './_components/Webinaire'
import { Solution } from './_components/Solution'

const HomePage = () => (
  <div className="fr-container--fluid">
    <section className="fr-background-alt--brown-caramel-950 fr-py-md-12w fr-py-6w">
      <Jumbotron />
    </section>
    <section className="fr-pt-md-11w fr-pb-md-15w fr-py-8w">
      <Fonctionnalites />
    </section>
    <section className="fr-background-alt--blue-france fr-py-md-15w fr-py-8w">
      <Solution />
    </section>
    <section className="fr-pt-md-11w fr-pb-md-15w fr-py-8w">
      <Contexte />
    </section>
    <section className="fr-background-alt--brown-caramel-950 fr-pt-md-11w fr-pb-md-15w fr-py-8w">
      <Outils />
    </section>
    <section className="fr-py-md-15w fr-py-8w">
      <Faq />
    </section>
    <section className="fr-background-alt--blue-france fr-pt-md-11w fr-pb-md-15w fr-py-8w">
      <QuiSommesNous />
    </section>
    <section>
      <Webinaire />
    </section>
  </div>
)

export default HomePage
