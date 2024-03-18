/* eslint jsx-a11y/control-has-associated-label: 0  */
import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Link from 'next/link'



export const revalidate = 0
export const metadata: Metadata = {
  title: metadataTitle(`Pour bien commencer`),
}

const ContentPolicyPage = () => (
  <div className="fr-container">
    <Breadcrumbs currentPage="Pour bien commencer" />
    <div className="fr-container landing-main-container fr-my-8w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-md-8">
          <h1 className="fr-page-title">Pour bien commencer</h1>
            <svg className="fr-width-full fr-mb-2w"  viewBox="0 0 588 320" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="588" height="320" rx="8" fill="#F5F5FE"/><rect x="250" y="71" width="88" height="88" rx="16" fill="#E3E3FD"/><path d="m293.17 141.536-25.586-19.902a.626.626 0 0 1 .006-.993l3.846-2.914a.63.63 0 0 1 .762.004l20.973 16.264a.63.63 0 0 0 .768 0l20.972-16.264a.624.624 0 0 1 .762-.004l3.847 2.914a.626.626 0 0 1 .006.993l-25.587 19.901a.626.626 0 0 1-.769 0zm0-14.934-25.595-19.908a.626.626 0 0 1 0-.988l25.595-19.908a.63.63 0 0 1 .769 0l25.595 19.908a.626.626 0 0 1 0 .988l-25.595 19.908a.63.63 0 0 1-.769 0m.768-7.539 15.981-12.368a.626.626 0 0 0 0-.99l-15.981-12.368a.63.63 0 0 0-.767 0l-15.982 12.368a.626.626 0 0 0 0 .99l15.982 12.368c.225.175.54.175.767 0" fill="#000091"/><path d="M108.831 205v-22.4h3.648v19.04h8.832V205zm30.73-2.624c-1.504 2.016-3.968 3.264-6.976 3.264-5.569 0-8.864-4-8.864-8.704 0-4.832 3.072-8.704 8.192-8.704 4.448 0 7.328 3.04 7.328 7.136 0 .736-.096 1.472-.224 1.952h-11.904c.224 3.52 2.368 5.344 5.472 5.344 1.952 0 3.584-.864 4.576-2.208zm-7.712-11.392c-2.4 0-4.064 1.376-4.576 3.872h8.672c-.064-2.016-1.504-3.872-4.096-3.872m9.927 11.744 2.272-1.984c1.056 1.344 2.336 2.208 3.936 2.208 1.568 0 2.432-.96 2.432-2.176 0-3.264-7.904-2.08-7.904-7.776 0-2.656 2.24-4.768 5.472-4.768 2.368 0 4.448 1.152 5.6 2.688l-2.24 1.952c-.864-1.152-1.984-1.952-3.328-1.952-1.536 0-2.304.896-2.304 1.984 0 3.232 7.904 2.144 7.904 7.68-.032 3.168-2.592 5.056-5.6 5.056-2.72 0-4.736-1.088-6.24-2.912M167.144 205v-22.4h5.984c4.448 0 7.168 2.272 7.168 5.952 0 1.92-.896 3.52-2.56 4.512 2.496.992 3.872 2.976 3.872 5.44 0 4-3.04 6.496-7.968 6.496zm6.048-19.296h-2.4v6.016h2.4c2.08 0 3.296-1.12 3.296-3.072 0-1.856-1.216-2.944-3.296-2.944m.64 9.088h-3.04v7.104h3.04c2.496 0 3.968-1.312 3.968-3.552 0-2.272-1.472-3.552-3.968-3.552m16.71 10.688c-3.2 0-5.376-1.824-5.376-4.672 0-2.432 1.888-4.192 5.312-4.768l5.216-.864v-.832c0-1.984-1.472-3.2-3.552-3.2-1.76 0-3.136.8-4.064 2.112l-2.464-1.888c1.44-1.92 3.744-3.136 6.624-3.136 4.352 0 6.752 2.56 6.752 6.112V205h-3.296v-1.824c-1.152 1.408-3.168 2.304-5.152 2.304m-2.048-4.8c0 1.248.992 2.112 2.656 2.112 2.016 0 3.584-.96 4.544-2.496v-2.784l-4.352.736c-2.016.352-2.848 1.216-2.848 2.432m14.063 2.048 2.272-1.984c1.056 1.344 2.336 2.208 3.936 2.208 1.568 0 2.432-.96 2.432-2.176 0-3.264-7.904-2.08-7.904-7.776 0-2.656 2.24-4.768 5.472-4.768 2.368 0 4.448 1.152 5.6 2.688l-2.24 1.952c-.864-1.152-1.984-1.952-3.328-1.952-1.536 0-2.304.896-2.304 1.984 0 3.232 7.904 2.144 7.904 7.68-.032 3.168-2.592 5.056-5.6 5.056-2.72 0-4.736-1.088-6.24-2.912m30.41-.352c-1.504 2.016-3.968 3.264-6.976 3.264-5.568 0-8.864-4-8.864-8.704 0-4.832 3.072-8.704 8.192-8.704 4.448 0 7.328 3.04 7.328 7.136 0 .736-.096 1.472-.224 1.952h-11.904c.224 3.52 2.368 5.344 5.472 5.344 1.952 0 3.584-.864 4.576-2.208zm-7.712-11.392c-2.4 0-4.064 1.376-4.576 3.872h8.672c-.064-2.016-1.504-3.872-4.096-3.872m9.927 11.744 2.272-1.984c1.056 1.344 2.336 2.208 3.936 2.208 1.568 0 2.432-.96 2.432-2.176 0-3.264-7.904-2.08-7.904-7.776 0-2.656 2.24-4.768 5.472-4.768 2.368 0 4.448 1.152 5.6 2.688l-2.24 1.952c-.864-1.152-1.984-1.952-3.328-1.952-1.536 0-2.304.896-2.304 1.984 0 3.232 7.904 2.144 7.904 7.68-.032 3.168-2.592 5.056-5.6 5.056-2.72 0-4.736-1.088-6.24-2.912m23.32-5.792c0-4.704 3.168-8.704 8.256-8.704 2.304 0 4.032.832 5.376 2.272V181h3.36v24h-3.36v-1.632c-1.344 1.44-3.072 2.272-5.376 2.272-5.088 0-8.256-4-8.256-8.704m3.488 0c0 3.168 2.08 5.6 5.184 5.6 2.08 0 3.872-.992 4.96-2.688v-5.824c-1.184-1.76-2.944-2.688-4.96-2.688-3.104 0-5.184 2.432-5.184 5.6m29.767 1.152v-9.216h3.328v9.056c0 4.832-2.784 7.712-7.296 7.712-4.544 0-7.328-2.88-7.328-7.712v-9.056h3.328v9.216c0 2.784 1.472 4.448 4 4.448 2.464 0 3.968-1.664 3.968-4.448M308.719 205v-16.128h3.296v1.568c1.216-1.28 2.816-2.208 5.12-2.208 3.552 0 6.272 2.4 6.272 7.072V205h-3.328v-9.568c0-2.56-1.408-4.096-3.712-4.096-2.208 0-3.52 1.376-4.352 2.784V205zm30.757-6.912v-9.216h3.328v9.056c0 4.832-2.784 7.712-7.296 7.712-4.544 0-7.328-2.88-7.328-7.712v-9.056h3.328v9.216c0 2.784 1.472 4.448 4 4.448 2.464 0 3.968-1.664 3.968-4.448m8.337 6.912v-16.128h3.296v1.504c1.152-1.248 2.656-2.144 4.8-2.144 2.208 0 4.064.992 5.088 2.912 1.248-1.6 2.848-2.912 5.632-2.912 3.36 0 5.952 2.304 5.952 6.752V205h-3.328v-9.888c0-2.368-1.312-3.776-3.392-3.776-1.92 0-3.168 1.216-4.032 2.752.032.288.032.576.032.896V205h-3.328v-9.888c0-2.368-1.28-3.776-3.392-3.776-2.048 0-3.264 1.408-4.032 2.784V205zm38.579-18.688h-3.2L386.52 181h3.648zm5.856 16.064c-1.504 2.016-3.968 3.264-6.976 3.264-5.568 0-8.864-4-8.864-8.704 0-4.832 3.072-8.704 8.192-8.704 4.448 0 7.328 3.04 7.328 7.136 0 .736-.096 1.472-.224 1.952H379.8c.224 3.52 2.368 5.344 5.472 5.344 1.952 0 3.584-.864 4.576-2.208zm-7.712-11.392c-2.4 0-4.064 1.376-4.576 3.872h8.672c-.064-2.016-1.504-3.872-4.096-3.872M396.251 205v-16.128h3.296v1.824c1.12-1.248 2.528-2.144 4.512-2.144.512 0 .992.096 1.408.224v3.232a6.6 6.6 0 0 0-1.696-.224c-2.048 0-3.392 1.088-4.224 2.464V205zm14.507-19.712c-1.216 0-2.24-1.024-2.24-2.24s1.024-2.24 2.24-2.24 2.24 1.024 2.24 2.24-1.024 2.24-2.24 2.24M409.094 205v-16.128h3.296V205zm7.408-8.064c0-4.704 3.168-8.704 8.224-8.704 2.336 0 4.064.832 5.408 2.304v-1.664h3.36v24h-3.36v-9.536c-1.344 1.472-3.072 2.304-5.408 2.304-5.056 0-8.224-4-8.224-8.704m3.456 0c0 3.168 2.08 5.6 5.184 5.6 2.112 0 3.904-.992 4.992-2.688v-5.824c-1.184-1.76-2.944-2.688-4.992-2.688-3.104 0-5.184 2.432-5.184 5.6m29.83 1.152v-9.216h3.328v9.056c0 4.832-2.784 7.712-7.296 7.712-4.544 0-7.328-2.88-7.328-7.712v-9.056h3.328v9.216c0 2.784 1.472 4.448 4 4.448 2.464 0 3.968-1.664 3.968-4.448m22.898 4.288c-1.504 2.016-3.968 3.264-6.976 3.264-5.569 0-8.864-4-8.864-8.704 0-4.832 3.072-8.704 8.192-8.704 4.448 0 7.328 3.04 7.328 7.136 0 .736-.096 1.472-.224 1.952h-11.904c.224 3.52 2.368 5.344 5.472 5.344 1.952 0 3.584-.864 4.576-2.208zm-7.712-11.392c-2.4 0-4.064 1.376-4.576 3.872h8.672c-.064-2.016-1.504-3.872-4.096-3.872m-297.503 49.952c0-4.704 3.168-8.704 8.256-8.704 2.304 0 4.032.832 5.376 2.272V225h3.36v24h-3.36v-1.632c-1.344 1.44-3.072 2.272-5.376 2.272-5.088 0-8.256-4-8.256-8.704m3.488 0c0 3.168 2.08 5.6 5.184 5.6 2.08 0 3.872-.992 4.96-2.688v-5.824c-1.184-1.76-2.944-2.688-4.96-2.688-3.104 0-5.184 2.432-5.184 5.6m20.418-5.472h-3.04l2.784-8.864h3.744zm9.069-6.176c-1.216 0-2.24-1.024-2.24-2.24s1.024-2.24 2.24-2.24 2.24 1.024 2.24 2.24-1.024 2.24-2.24 2.24M198.782 249v-16.128h3.296V249zm8.687 0v-16.128h3.296v1.568c1.216-1.28 2.816-2.208 5.12-2.208 3.552 0 6.272 2.4 6.272 7.072V249h-3.328v-9.568c0-2.56-1.408-4.096-3.712-4.096-2.208 0-3.52 1.376-4.352 2.784V249zm20.773-5.6v-7.552h-3.04v-2.976h3.04v-4.032h3.328v4.032h5.344v2.976h-5.344v7.552c0 2.176 1.152 2.88 2.944 2.88 1.088 0 1.824-.128 2.4-.352v2.912c-.768.32-1.664.48-2.912.48-3.776 0-5.76-1.984-5.76-5.92m20.994-13.088h-3.2l3.328-5.312h3.648zm5.856 16.064c-1.504 2.016-3.968 3.264-6.976 3.264-5.568 0-8.864-4-8.864-8.704 0-4.832 3.072-8.704 8.192-8.704 4.448 0 7.328 3.04 7.328 7.136 0 .736-.096 1.472-.224 1.952h-11.904c.224 3.52 2.368 5.344 5.472 5.344 1.952 0 3.584-.864 4.576-2.208zm-7.712-11.392c-2.4 0-4.064 1.376-4.576 3.872h8.672c-.064-2.016-1.504-3.872-4.096-3.872M259.094 249v-16.128h3.296v1.824c1.12-1.248 2.528-2.144 4.512-2.144.512 0 .992.096 1.408.224v3.232a6.6 6.6 0 0 0-1.696-.224c-2.048 0-3.392 1.088-4.224 2.464V249zm16.448-18.688h-2.944l3.328-5.312h4.352l3.328 5.312h-2.944l-2.56-3.808zm10.112 16.064c-1.504 2.016-3.968 3.264-6.976 3.264-5.568 0-8.864-4-8.864-8.704 0-4.832 3.072-8.704 8.192-8.704 4.448 0 7.328 3.04 7.328 7.136 0 .736-.096 1.472-.224 1.952h-11.904c.224 3.52 2.368 5.344 5.472 5.344 1.952 0 3.584-.864 4.576-2.208zm-7.712-11.392c-2.4 0-4.064 1.376-4.576 3.872h8.672c-.064-2.016-1.504-3.872-4.096-3.872m12.612 8.416v-7.552h-3.04v-2.976h3.04v-4.032h3.328v4.032h5.344v2.976h-5.344v7.552c0 2.176 1.152 2.88 2.944 2.88 1.088 0 1.824-.128 2.4-.352v2.912c-.768.32-1.664.48-2.912.48-3.776 0-5.76-1.984-5.76-5.92m19.5 8.48c0-1.632.8-2.912 2.304-4.032a3.06 3.06 0 0 1-1.056-2.304c0-1.28.608-2.304 1.856-3.168-1.408-1.056-2.208-2.688-2.208-4.48 0-3.104 2.4-5.664 6.336-5.664 1.216 0 2.272.224 3.168.64h5.952v2.816h-3.168a5.7 5.7 0 0 1 .448 2.208c0 3.136-2.4 5.728-6.4 5.728a9.3 9.3 0 0 1-1.952-.224c-.512.416-.8.896-.8 1.376 0 .672.352 1.056 1.216 1.056h4.384c4.16 0 6.24 2.144 6.24 5.056 0 3.488-3.392 6.112-8.288 6.112-4.96 0-8.032-1.824-8.032-5.12m7.264-10.784c2.08 0 3.296-1.376 3.296-3.2 0-1.792-1.216-3.136-3.296-3.136s-3.296 1.344-3.296 3.136c0 1.824 1.216 3.2 3.296 3.2m-4.128 10.336c0 1.792 1.792 2.88 4.832 2.88 3.2 0 5.056-1.248 5.056-3.136 0-1.376-.8-2.464-3.264-2.464h-5.12c-.896.704-1.504 1.568-1.504 2.72m24.358-21.12h-3.2l3.328-5.312h3.648zm5.856 16.064c-1.504 2.016-3.968 3.264-6.976 3.264-5.568 0-8.864-4-8.864-8.704 0-4.832 3.072-8.704 8.192-8.704 4.448 0 7.328 3.04 7.328 7.136 0 .736-.096 1.472-.224 1.952h-11.904c.224 3.52 2.368 5.344 5.472 5.344 1.952 0 3.584-.864 4.576-2.208zm-7.712-11.392c-2.4 0-4.064 1.376-4.576 3.872h8.672c-.064-2.016-1.504-3.872-4.096-3.872M347.407 249v-16.128h3.296v1.568c1.216-1.28 2.816-2.208 5.12-2.208 3.552 0 6.272 2.4 6.272 7.072V249h-3.328v-9.568c0-2.56-1.408-4.096-3.712-4.096-2.208 0-3.52 1.376-4.352 2.784V249zm28.516-18.688h-3.2l3.328-5.312h3.648zm5.856 16.064c-1.504 2.016-3.968 3.264-6.976 3.264-5.568 0-8.864-4-8.864-8.704 0-4.832 3.072-8.704 8.192-8.704 4.448 0 7.328 3.04 7.328 7.136 0 .736-.096 1.472-.224 1.952h-11.904c.224 3.52 2.368 5.344 5.472 5.344 1.952 0 3.584-.864 4.576-2.208zm-7.712-11.392c-2.4 0-4.064 1.376-4.576 3.872h8.672c-.064-2.016-1.504-3.872-4.096-3.872M385.782 249v-16.128h3.296v1.824c1.12-1.248 2.528-2.144 4.512-2.144.512 0 .992.096 1.408.224v3.232a6.6 6.6 0 0 0-1.696-.224c-2.048 0-3.392 1.088-4.224 2.464V249zm16.542.48c-3.2 0-5.376-1.824-5.376-4.672 0-2.432 1.888-4.192 5.312-4.768l5.216-.864v-.832c0-1.984-1.472-3.2-3.552-3.2-1.76 0-3.136.8-4.064 2.112l-2.464-1.888c1.44-1.92 3.744-3.136 6.624-3.136 4.352 0 6.752 2.56 6.752 6.112V249h-3.296v-1.824c-1.152 1.408-3.168 2.304-5.152 2.304m-2.048-4.8c0 1.248.992 2.112 2.656 2.112 2.016 0 3.584-.96 4.544-2.496v-2.784l-4.352.736c-2.016.352-2.848 1.216-2.848 2.432m15.662 4.32v-24h3.296v24z" fill="#161616"/></svg>
            <h2 className="fr-page-title ">Les Bases du numérique d’intérêt général, de quoi parle-t-on ?</h2>
            <p><strong>La plateforme collaborative de partage de ressources & communs numériques à l’échelle nationale.</strong></p>
            <p>Sans se substituer aux sites internet, bibliothèques d’outils,
                ressourceries... qui existent déjà, Les Bases a pour vocation
                de devenir le centre de ressources des acteurs du numérique
                d’intérêt général en rendant accessible, pour la première fois
                au niveau national, l'ensemble des contenus et outils
                produits par et pour le secteur.</p>
            <p>Les Bases est une plateforme ouverte à toutes celles et ceux
                intéressés par le partage de ressources en lien avec le
                numérique d’intérêt général. Que vous soyez agent public ou
                salarié privé, médiateur ou aidant numérique, il existe
                forcément une bonne raison d’utiliser Les Bases !</p>
            <h4>Quel est l’objectif de cette plateforme ?</h4>
            <p>Il n’existe pas aujourd’hui d’espace partagé (ou plusieurs, mais non-
                exhaustifs, ou parfois peu maintenus) répertoriant les dispositifs et
                ressources de l’inclusion numérique et du numérique d’intérêt général. Or, le
                besoin des professionnels de l’inclusion et de la médiation numérique, des
                acteurs locaux et des collectivités territoriales d’un outil dédié au
                recensement d’outils et de ressources est récurrent.</p>
            <p>Le programme Société Numérique de l'Agence Nationale de la Cohésion
                des Territoires (ANCT) a souhaité créer dans ce cadre un outil utile au
                quotidien pour les acteurs de l'inclusion et de la médiation numérique, leur
                permettant de :</p>
            <ul>
                <li>Mettre en lumière la richesse de l’offre déjà existante</li>
                <li>Stimuler la création de nouvelles ressources répondant à des besoins collectivement identifiés</li>
                <li>Favoriser une large diffusion, utilisation et appropriation des ressources.</li>
            </ul>
            <h4>Comment utiliser cette plateforme ?</h4>
            <h6>Faire de la veille</h6>
            <p><strong>Inspirez-vous des ressources produites par une communauté au service du numérique d'intérêt général.</strong></p>
            <p>La Base du numérique d'intérêt général permet de rechercher, prendre
                connaissance, et s’inspirer des ressources produites par la communauté
                grâce à un moteur de recherche et des thématiques adaptées, avec la
                possibilité d’enregistrer des ressources ou des collections partagées par
                d’autres.</p>
            <h6>Produire & diffuser des ressources</h6>
            <p><strong>Présentez, valorisez & publiez vos ressources afin qu’elles soient diffusées auprès d’un large public.</strong></p>
            <p>Les Bases du numérique d'intérêt général permet de présenter et mettre en
                valeur vos ressources grâce à un système modulaire de présentation des
                contenus, qui vous donne toute la liberté pour composer de vraies pages
                d’information et de démonstration (exemples d’utilisation, conditions pour
                l’utilisation des outils, la reproduction et l’adaptation des initiatives...). Ces
                pages peuvent ensuite être rendues publiques, c’est-à-dire consultables par
                tous, qu’ils soient membres ou non de la plateforme.</p>
            <h6>Contribuer à une communauté</h6>
            <p>Collaborez avec d’autres utilisateurs & contribuez à la création et
                l’amélioration de ressources, localement ou à l’échelle nationale.
            </p>
            <h4>Qui peut utiliser cette plateforme ?</h4>
            <p>Cette plateforme contributive est ouverte à toutes les personnes qui
                souhaitent découvrir et/ou publier et partager des ressources dédiées à
                l’inclusion, la médiation numérique et le numérique d’intérêt général.</p>
            <p>Cette plateforme est notamment destinée à l’ensemble des acteurs du numérique d’intérêt général :</p>
            <ul>
                <li>Aidants numériques</li>
                <li>Médiateurs numériques</li>
                <li>Travailleurs sociaux</li>
                <li>Agents publics</li>
                <li>Travailleurs associatifs et salariés de l’ESS</li>
                <li>Agents de collectivités</li>
                <li>Élus</li>
                <li>Enseignants & professionnels de la formation</li>
                <li>Entreprises</li>
                <li>Autres professionnels</li>
            </ul>
            <hr/>
            <h2 className="fr-page-title">Créer son compte & se connecter</h2>
            <h3>Création de compte</h3>
            <h4>Inclusion Connect</h4>
            <p>Inclusion Connect (https://connect.inclusion.beta.gouv.fr/accounts/register/)
                est une solution de connexion unique à plusieurs services publics pour les
                professionnels de l'inclusion.
                Vous pouvez créer votre compte sur Les Bases, et vous y connecter par le
                biais d’Inclusion Connect, qui fournira votre nom, prénom et email à la
                plateforme Les Bases.</p>
            <h4>Email</h4>
            <p>Renseignez votre nom, prénom et email, et votre compte est prêt à être utilisé !</p>
            <h2>Se connecter</h2>
            <h4>Inclusion Connect</h4>
            <p>Inclusion Connect (https://connect.inclusion.beta.gouv.fr/accounts/register/)
                est une solution de connexion unique à plusieurs services publics pour les
                professionnels de l'inclusion.</p>
            <p>Vous pouvez créer votre compte sur Les Bases, et vous y connecter par le
                biais d’Inclusion Connect, qui fournira votre nom, prénom et email à la
                plateforme Les Bases.</p>
            <h4>Connexion par email</h4>
            <p>Vous pouvez également renseigner l’email utilisé pour votre compte et vous
                recevrez un lien de connexion pour vous connecter. Pas besoin de
                retenir de mot de passe !</p>
            <hr/>
            <h2 className="fr-page-title">Profitez dès à présent de votre profil</h2>
            <h3>Création de compte</h3>
            <h4>Inclusion Connect</h4>
            <p>Inclusion Connect (https://connect.inclusion.beta.gouv.fr/accounts/register/)
                est une solution de connexion unique à plusieurs services publics pour les
                professionnels de l'inclusion.</p>
            <p>Vous pouvez créer votre compte sur Les Bases, et vous y connecter par le
                biais d’Inclusion Connect, qui fournira votre nom, prénom et email à la
                plateforme Les Bases.</p>
            <h4>Email</h4>
            <p>Renseignez votre nom, prénom et email, et votre compte est prêt à être
                utilisé !</p>
            <h2>Se connecter</h2>
            <Notice className="fr-mb-2w"
                title=<div className="fr-text--regular "> <span className="fr-text-default--grey">Votre profil est créé par défaut en profil public (visible par tous les visiteurs).</span>{" "}<Link  href="">En savoir plus ici</Link></div>
            />
            <p>Lorsque vous vous inscrivez sur Les Bases du numérique d’intérêt général, un
                profil est automatiquement créé avec les informations que vous remplissez
                lors de votre inscription. Ce profil est donc personnel et individuel.</p>
            <p>Grâce à votre profil, vous pouvez :</p>
                <ul><li>Créer et publiez directement vos ressources depuis votre profil</li>
                    <li>Enregistrer des ressources qui vous intéressent grâce aux collections.</li>
                    <li>Enregistrer des ressources qui vous intéressent grâce aux collections.</li>
                    <li>Rejoindre une ou plusieurs bases pour collaborer à la création de ressources.</li>
                    <li>Suivre les bases et les profils qui vous intéressent pour les retrouver plus facilement.</li>
                    </ul>
        <Notice className="fr-mb-2w"
                title=<Link  href="">Retrouvez ici plus d’informations sur comment utiliser votre profil</Link>
/>
        </div>
      </div>
    </div>
  </div>
)
export default ContentPolicyPage
