/* eslint jsx-a11y/control-has-associated-label: 0 */
import type { Metadata } from 'next';
import { metadataTitle } from '@app/web/app/metadataTitle';
import Breadcrumbs from '@app/web/components/Breadcrumbs';
import Notice from '@codegouvfr/react-dsfr/Notice';
import Link from 'next/link';
import { Table } from "@codegouvfr/react-dsfr/Table";
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
          <h1 className="fr-page-title">Une base</h1>
          <img className="fr-width-full" src="/images/centre-d-aide/base.svg" alt=""/>
          <h2 className="fr-page-title">Une base, c’est quoi ?</h2>
          <p>Une base est un espace collaboratif entre plusieurs membres souhaitant produire et/ou publier des ressources en commun.</p>
          <p>Une base peut notamment représenter une structure, une administration, un collectif qui souhaite regrouper et publier diverses ressources relatives à son activité, ses outils, guides, etc.</p>
          <p>Une base, si elle est publique, sert d’espace de publication commun pour ses membres.</p>
          <p>Une base peut être <Link className="fr-link" href="#">publique</Link> (visible par tous les visiteurs) ou <Link className="fr-link" href="#">privée</Link> (visible uniquement par ses membres).</p>
          <hr />
          <h2 className="fr-page-title">Comment utiliser une base ?</h2>
          <ul>
            <li>Créez et publiez (si votre base est publique) des ressources en commun depuis votre base</li>
            <li>Retrouvez l’ensemble des ressources créées par les membres de votre base</li>
            <li>Enregistrez des ressources dans des collections communes</li>
            <li>Retrouvez et gérez les membres de votre base et leurs rôles</li>
          </ul>
          <p>Les membres d’une base peuvent éditer l’ensemble de ses contenus (ressources, collections, informations et paramètres) ainsi qu’inviter de nouveaux membres. Retrouvez plus d’informations <Link className="fr-link" href="#">les rôles et les permissions ici</Link>.</p>
          <h4>Base publique</h4>
          <p>Utilisez votre base comme un espace de publication commun</p>
          <p>Votre base publique est l’endroit où les visiteurs de la plateforme peuvent retrouver toutes les ressources et collections publiques créées par ses membres. Votre base sera référencée dans le moteur de recherche de la plateforme et les visiteurs peuvent également suivre votre base afin de retrouver plus facilement les prochaines ressources publiées sur celle-ci.</p>
          <p>Les visiteurs pourront également retrouver les informations que vous avez renseignées sur votre base (nom de la base, département, description) ainsi que les membres et leurs rôles.</p>
          <p><strong>Retrouvez plus de détails sur la visibilité d’une base publique ici.</strong></p>
          <Notice className="fr-mb-2w" title={<div className="fr-text--regular"><span className="fr-text-default--grey">Si vous ne souhaitez pas utiliser votre base comme un espace de publication commun, vous pouvez modifier la visibilité de votre base et passer à une base privée.</span></div>} />
          <h4>Base privée</h4>
          <p>Utilisez votre base comme un espace de création & de collecte de ressources commun</p>
          <p>Si vous ne souhaitez pas utiliser votre base comme un espace de publication commun, vous pouvez la passer en “privée”.</p>
          <p>Une base privée vous permet d’avoir un espace commun de création et de collecte de ressources partagé et visible uniquement par les personnes qui en sont membres.</p>
          <p><strong>Retrouvez plus de détails sur les usages d’une base privée ici.</strong></p>
          <hr />
          <h1 className="fr-page-title">Créer une base</h1>
          <p>Pour créer une nouvelle base, cliquez sur votre nom situé en haut à droite dans la barre de navigation puis sur <strong>“Créer une base”</strong> dans le menu déroulant.</p>
          <p>Vous accédez ensuite au formulaire de création d’une base qui va vous permettre de compléter les informations suivantes :</p>
          <p><strong>Renseigner des informations de la base :</strong></p>
          <p>- Nom de la base (obligatoire) </p>
          <p>- Département (optionnel)</p>
          <p>- Description (optionnel)</p>
          <p><strong>Renseigner des informations de contacts :</strong></p>
          <p>- Adresse mail (obligatoire)</p>
          <p>- Liens vers un site internet (optionnel)</p>
          <p>- Liens vers vos réseaux sociaux : Facebook, Linkedin, X (Twitter) (optionnel)</p>
          <p><strong>Choisir la visibilité de la base :</strong> publique ou privée - <Link href="#">en savoir plus ici</Link></p>
          <p><strong>Inviter des membres - </strong><Link href="#">en savoir plus ici</Link></p>
          <p><strong>Ajouter un logo/une image de base et une image de couverture - </strong><Link href="#"> en savoir plus ici</Link></p>
          <p>Dès que vous avez renseigné les informations souhaitées, vous pouvez cliquer en bas du formulaire sur le bouton <strong>‘Créer la base’.</strong></p>
          <Notice className="fr-mb-2w" title={<div className="fr-text--regular "><span className="fr-text-default--grey">Vous pourrez modifier à tout moment les informations & les paramètres de votre base en allant sur la page de votre base et en cliquant sur le bouton ‘Modifier votre base’ présent dans l’en-tête.</span>{" "}<Link href="#">En savoir plus ici</Link></div>} />
          <hr />
          <h2 className="fr-page-title">Gérer les membres d’une base</h2>
          <h4>Les rôles & leurs permissions</h4>
          <p>Sur une base, deux rôles sont disponibles : <strong>Administrateur & membre</strong></p>
          <p>Le créateur d’une base est par défaut l’administrateur de celle-ci. Les administrateurs peuvent nommer d’autres administrateurs et ajouter et supprimer des membres.</p>
          <p>Retrouvez dans le tableau ci-dessous les différentes permissions de ces deux rôles :</p>

          <h4>Inviter/supprimer un membre</h4>
          <p><strong>Inviter un membre</strong></p>
          <p>Pour inviter un membre dans une de vos bases, allez dans l’onglet <strong>‘Membres’</strong> de votre base, puis cliquez sur le bouton <strong>‘Inviter un membre’.</strong></p>
          <p>Une modale va ensuite vous permettre d’inviter un ou plusieurs nouveaux membres en renseignant :</p>
          <p>- Nom/prénom ou adresse mail s’ils ont déjà un profil</p>
          <p>- Adresse mail s’ils n’ont pas encore créé leur profil</p>
          <Notice className="fr-mb-2w" title={<div className="fr-text--regular "><span className="fr-text-default--grey">Tous les membres d’une base peuvent ajouter des membres. Si vous êtes administrateur, vous pouvez choisir leur rôle.</span></div>} />
          <p><strong>Supprimer un membre</strong></p>
          <p>Pour supprimer un membre dans une de vos bases, allez dans l’onglet <strong>‘Membres’</strong> de votre base, puis cliquez sur le bouton <strong>‘Supprimer le membre’</strong> symbolisé par l’icône corbeille</p>
          <Notice className="fr-mb-2w" title={<div className="fr-text--regular "><span className="fr-text-default--grey">Seuls les administrateurs peuvent supprimer les membres d’une base</span></div>} />
          <hr/>
          <h1 className="fr-page-title">Informations & paramètres d’une base</h1>
          <p>Dès lors que vous aurez créer une base, vous pouvez venir modifier les
            informations & paramètres de votre base à tout moment.</p>
          <p>Pour modifier les paramètres de votre base, allez sur votre base toujours
            disponible via le menu déroulant situé en haut à droite dans la barre de
            navigation et cliquez sur {" "}<strong>‘le nom de votre base’.</strong> Lorsque vous êtes sur votre
            base, cliquez sur le bouton {" "}<strong>‘Modifier la base’</strong> présent dans l’en-tête.</p>
          <img className="fr-width-full" src="/images/centre-d-aide/infos_base.svg" alt=""/>
          <p>Sur cette page, vous pouvez venir modifier les différentes informations &
            paramètres d’une base en cliquant sur le bouton {" "}<strong>‘Modifier’ symbolisé par
              l’icône stylo</strong> présent en haut à droite de chaque bloc. Après avoir modifier
            les informations et/ou les paramètres dans un bloc, vous pouvez
            <strong>‘Enregistrer’</strong> ou {" "} <strong>‘Annuler’</strong> vos modifications.</p>
          <p>Retrouvez ci-dessous la liste des informations & paramètres disponibles dans une base :</p>
          <h3>Image de couverture & logo d’une base</h3>
          <p>Vous pouvez modifier à tout moment le logo/image de base et l’image de
            couverture de la base en cliquant sur le bouton {" "} <strong>“Modifier la photo”
              symbolisé par l’icône appareil</strong> photo en bas à droite du logo/image de base
            ou de l’image de couverture.</p>
          <p><strong>Format d’image du logo/image de votre base :</strong></p>
          <ul>
            <li>Taille recommandée : 384x384 px.</li>
            <li>Poids maximum : 10 Mo.</li>
            <li>Formats supportés : jpg, png, webp.</li>
          </ul>
          <Notice className="fr-mb-2w"
                  title=<div className="fr-text--regular "> <span className="fr-text-default--grey">Lorsque l’emplacement pour le logo de la base est vide, un icône provenant de la libraire Open Source <Link href="">avvvatars.com</Link> est intégré par défaut.</span></div>
      />
      <p><strong>Format d’image de couverture d’une base :</strong></p>
      <ul>
        <li>Taille recommandée : 2400x500 px.</li>
        <li>Poids maximum : 10 Mo.</li>
        <li>Formats supportés : jpg, png, webp.</li>
      </ul>
      <h3>Informations de la base</h3>
    <p>Vous pouvez en dire plus aux visiteurs de votre base en renseignant les informations suivantes :</p>
      <ul>
        <li>Nom de la base (obligatoire)</li>
        <li>Département (optionnel)</li>
        <li>Description (optionnel) : Les 200 premiers caractères de votre
          description seront directement visibles via le moteur de recherche de la
          plateforme afin d’offrir aux visiteurs d’avantage de contexte sur votre
          base.</li>
      </ul>
      <Notice className="fr-mb-2w"
              title=<div className="fr-text--regular "> <span className="fr-text-default--grey">Dans le cas d’un profil public, ses informations seront visibles via votre page de profil public dans l’onglet {" "} <strong>‘À propos’.</strong> Sur un profil privé, seul votre nom & prénom seront visibles.</span></div>
/>
<h3>Contacts</h3>
<p>Vous pouvez renseigner dans ce bloc différentes informations de contacts :</p>
<ul>
  <li>Adresse mail (obligatoire pour la création d’une base, mais vous pouvez
    choisir de la rendre publique ou non afin de pouvoir être contacté par
    les visiteurs de la plateforme)</li>
  <li>Lien vers votre site internet (optionnel)</li>
  <li>Liens vers vos réseaux sociaux : Facebook, Linkedin, X (Twitter)
    (optionnel)</li>
</ul>
<h3>Visibilité de la base</h3>
<p>Vous pouvez venir modifier à tout moment la visibilité d’une base dont vous
  êtes membre. Pour rappel, une base peut être publique (visible par tous les
  visiteurs) ou privée (Visible uniquement par les membres de votre base).</p>
<p><strong>Retrouvez ci-dessous le tableau comparatif des usages entre base publique et privée :</strong></p>
<h3>Supprimer la base</h3>
<p>Cette action est irréversible et entraîne la suppression définitive de votre
  base. Dans le cas où vous supprimer votre base, toutes les ressources de la
  base seront supprimés définitivement.</p>
    </div>
</div>
      </div>
    </div>
);

export default ContentPolicyPage;
