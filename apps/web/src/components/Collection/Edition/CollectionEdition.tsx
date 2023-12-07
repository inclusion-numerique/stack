import React from 'react'
import { CollectionPageData } from '../../../server/collections/getCollection'
import CollectionSideMenu from './CollectionSideMenu'

const ProfileEdition = ({ collection }: { collection: CollectionPageData }) => {
  return (
    <div>
      <div className="fr-hidden fr-unhidden-lg">
        <div>
          <CollectionSideMenu />
        </div>
      </div>
      <div>
        <h2>{collection.title}</h2>
        <h3 id={'informations'}>Informations de la collection</h3>
        <h3 id={'apercu'}>Aperçu de la collection</h3>
        <h3 id={'visibilite'}>Visibilité de la collection</h3>
        <h3 id={'supprimer'}>Supprimer la collection</h3>
        {/*<ProfileInformations*/}
        {/*  profile={profile}*/}
        {/*  resourcesCount={resources.length}*/}
        {/*  editMode*/}
        {/*/>*/}
        {/*<Visibility profile={profile} resources={resources} />*/}
      </div>
    </div>
  )
}

export default ProfileEdition
