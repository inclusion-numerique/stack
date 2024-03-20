/* eslint jsx-a11y/control-has-associated-label: 0 */
import React from 'react';
import type { Metadata } from 'next';
import { metadataTitle } from '@app/web/app/metadataTitle';
import Breadcrumbs from '@app/web/components/Breadcrumbs';
import Notice from '@codegouvfr/react-dsfr/Notice';
import Link from 'next/link';

export const revalidate = 0;

export const metadata: Metadata = {
  title: metadataTitle(`Centre d'aide`),
};

const ContentPolicyPage = () => (
  <div className="fr-container">
    <Breadcrumbs currentPage="Centre d'aide" />
    <div className="fr-container landing-main-container fr-my-8w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-md-8">
          <h1 className="fr-page-title">Le profil</h1>
          <img className="fr-width-full" src="/images/centre-d-aide/profil.svg" />
          <h2 className="fr-page-title">Un profil... c’est quoi ?</h2>
          <p>Votre profil est un espace personnel où vous pouvez accéder à toutes les ressources que vous avez créées, à vos collections, aux bases dont vous êtes membre ainsi qu’aux profils et aux bases que vous suivez.</p>
          <p>Votre profil, s’il est public, peut également être utilisé comme un espace personnel de publication.</p>
          <p>Un profil peut être <Link href=""><a className="fr-page-title">public</a></Link> (visible par tous les visiteurs) ou <Link href=""><a className="fr-page-title">privé</a></Link> (visible uniquement par le créateur du profil).</p>
          <p>Lorsque vous vous inscrivez sur Les Bases du numérique d’intérêt général, un profil est automatiquement créé avec les informations que vous remplissez lors de votre inscription. Ce profil est donc personnel et individuel.</p>
          <Notice className="fr-mb-2w" title={<div className="fr-text--regular"><span className="fr-text-default--grey"><strong>À savoir pour les utilisateurs de la 1ère version de la plateforme</strong></span><p>Si vous aviez créé une base personnelle, c’est-à-dire portant votre nom et prénom, et sur laquelle vous étiez le ou la seule à publier du contenu, celle-ci est automatiquement devenue un profil sur Les Bases.</p></div>} />
          <hr />
          <h2 className="fr-page-title">Comment utiliser votre profil ?</h2>
          <ul>
            <li>Retrouvez l’ensemble des ressources que vous avez créée ou auxquels vous avez contribué dans un même espace</li>
            <li>Créez et publiez (si votre <Link href=""><a className="fr-page-title">profil est public</a></Link>) directement vos ressources depuis votre profil</li>
            <li>Enregistrez des ressources qui vous intéressent grâce aux collections.</li>
            <li>Rejoignez une ou plusieurs bases pour collaborer à la création de ressources.</li>
            <li>Suivez les bases & les profils qui vous intéressent pour les retrouver plus facilement.</li>
          </ul>
          <h4>Profil public</h4>
          <p className="fr-page-title">Utilisez votre profil comme un espace de publication personnel</p>
          <p>Votre page de profil public est l'endroit où les visiteurs de la plateforme peuvent retrouver toutes vos ressources et collections publiques. Votre profil sera référencé dans le moteur de recherche de la plateforme et les visiteurs peuvent également vous suivre afin de retrouver plus facilement vos prochaines ressources publiées.</p>
          <p>Les visiteurs pourront également retrouver les informations que vous avez renseigné sur votre profil (prénom, nom, département, description) ainsi que les bases dont vous êtes membres et les bases et profils que vous suivez.</p>
          <p><strong>Retrouvez plus de détails sur la visibilité d’un profil public <span className="fr-page-title">ici.</span></strong></p>
          <Notice className="fr-mb-2w" title={<div className="fr-text--regular"><span className="fr-text-default--grey"><p>Si vous ne souhaitez pas utiliser votre profil comme un espace personnel de publication, vous pouvez modifier la visibilité de votre profil et passer à un profil privé.</p></span></div>} />
          <h4>Profil privé</h4>
          <p className="fr-page-title">Utilisez votre profil comme un espace de création & de collecte de ressources personnel</p>
          <p>Un profil privé vous permet d’avoir un espace de création & de collecte de ressources personnel.</p>
          <Notice className="fr-mb-2w" title={<div className="fr-text--regular"><span className="fr-text-default--grey"><p>Avec un profil “privé”, vous pouvez toujours devenir membre d’une base et publier des ressources sur cette base. Vous pouvez donc toujours participer à des espaces de publications communs.</p></span></div>} />
          <p>Avec un profil privé, vous n’avez donc plus la possibilité de publier des ressources directement depuis votre profil et votre page profil ne sera pas référencée dans le moteur de recherche de la plateforme. La visibilité de votre profil pour les visiteurs se limitera à votre nom et prénom.</p>
          <p>Mis à part cette différence de visibilité, un profil privé vous donne accès aux mêmes usages qu’un profil public.</p>
          <p><strong>Retrouvez plus de détails sur la visibilité d’un profil privé <span className="fr-page-title">ici.</span></strong></p>
          <hr />
          <h1 className="fr-page-title">Informations & paramètres du profil</h1>

<p>Dès lors que vous aurez créer votre profil, vous pouvez venir modifier les
  informations & paramètres de votre profil à tout moment.</p>
<p>Pour modifier les paramètres de votre profil, allez sur votre page profil
  toujours disponible via le menu déroulant situé en haut à droite dans la
  barre de navigation et cliquez sur <strong>‘Voir mon profil’</strong>. Lorsque vous êtes sur
  votre profil, cliquez sur le bouton <strong>‘Modifier le profil’</strong> présent dans l’en-tête.</p>
<img className="fr-width-full" src="/images/centre-d-aide/infos_profil.svg"/>
<p>Sur cette page, vous pouvez venir modifier les différentes informations &
  paramètres sur votre profil en cliquant sur le bouton <strong>‘Modifier’ symbolisé
  par l’icône stylo</strong> présent en haut à droite de chaque bloc. Après avoir
  modifier les informations et/ou les paramètres dans un bloc, vous pouvez
  {" "}<strong>‘Enregistrer’</strong> ou <strong>‘Annuler’</strong> vos modifications pour chacun des blocs.</p>
<h4>Image de profil</h4>
<p>Vous pouvez modifier votre image de profil en cliquant sur le bouton
  {" "}<strong>‘Modifier la photo de profil’ symbolisé par l’icône appareil photo</strong>. Par
  défaut, votre image de profil sera composé des initiales de votre nom &
  prénom.</p>
<p><strong>Format d’image de profil</strong></p>
<ul>
  <li>Taille recommandée : 384x384 px.</li>
  <li>Poids maximum : 10 Mo.</li>
  <li>Formats supportés : jpg, png, webp.</li>
</ul>
<h4>Informations sur votre profil</h4>
<p>Vous pouvez en dire plus sur vous-même aux visiteurs de votre profil en
  renseignant les informations suivantes :</p>
<ul>
  <li>Prénom (obligatoire)</li>
  <li>Nom (obligatoire)</li>
  <li>Département (optionnel)</li>
  <li>Description (optionnel)</li>
</ul>
<Notice className="fr-mb-2w"
        title=<div className="fr-text--regular"> <span className="fr-text-default--grey">
<p>Dans le cas d’un profil public, ses informations seront visibles via votre
page de profil public dans l’onglet {" "}<strong>‘À propos’</strong>. Sur un profil privé, seul
votre nom & prénom seront visibles.</p>
</span></div>
/>
<h4>Contacts</h4>
<p>Vous pouvez renseigner dans ce bloc différentes informations de contacts :</p>
<ul>
  <li>Adresse mail (obligatoire pour la création de compte, mais vous pouvez
    hoisir de la rendre publique ou non afin de pouvoir être contacté par
    les visiteurs de la plateforme)</li>
  <li>Lien vers votre site internet (optionnel)</li>
  <li>Liens vers vos réseaux sociaux : Facebook, Linkedin, X (Twitter)
    (optionnel)</li>
</ul>
<Notice className="fr-mb-2w"
        title=<div className="fr-text--regular"> <span className="fr-text-default--grey">
<p>Dans le cas d’un profil public, ses informations seront visibles via votre page de profil public dans l’onglet {" "}<strong>‘À propos’</strong>.</p>
</span></div>
/>
<h4>Visibilité du profil</h4>
      <p>Vous pouvez venir modifier à tout moment la visibilité de votre profil. Pour
  rappel, un profil peut être <span><Link href="">public</Link></span> (visible par tous les visiteurs) ou <span><Link href="">privé</Link></span>{" "}
  (visible uniquement par le créateur du profil).</p>
<p><strong>Retrouvez ci-dessous le tableau comparatif des usages entre profil public et
  privé :</strong></p>

<h4>Supprimer le profil</h4>
  <p>Cette action est irréversible et entraîne la suppression définitive de votre
  profil. Dans le cas où vous supprimez votre profil, toutes les ressources dont
  vous êtes le seul contributeur et les bases dont vous êtes le seul membre
  seront également supprimées.</p>
</div>
      </div>
    </div>
  </div>
)
export default ContentPolicyPage;
