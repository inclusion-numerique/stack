'use client'

import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@codegouvfr/react-dsfr/Button'
// import { CroppedImageType } from '@app/ui/components/CroppedUpload/utils'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
// import {
//   CreateCollectionCommand,
//   CreateCollectionCommandValidation,
// } from '@app/web/server/collections/createCollection'
import { CollectionPageData } from '@app/web/server/collections/getCollection'
import { AttributePreview } from '@app/web/components/AttributePreview'
import CustomCard from '@app/web/components/CustomCard'
import CustomTag, { TagColor } from '@app/web/components/CustomTag'
import EditableCard from '@app/web/components/EditableCard'
import CollectionSideMenu from './CollectionSideMenu'
// import ImageEdition from './ImageEdition'
import EditCollectionInformation from './EditCollection'

const CollectionEdition = ({
  collection,
  base,
}: {
  collection: CollectionPageData
  base: { id: string; isPublic: boolean } | null
}) => {
  const [isLoading /* setLoadingState */] = useState(false)

  // const form = useForm<CreateCollectionCommand>({
  //   resolver: zodResolver(CreateCollectionCommandValidation),
  //   defaultValues: {
  //     baseId: base?.id,
  //     isPublic: collection.isPublic,
  //   },
  // })
  // const {
  //   formState: { isSubmitting },
  //   control,
  // } = form

  // const [image, setImage] = useState<CroppedImageType>()

  return (
    <div className="fr-grid-row">
      <CollectionSideMenu />
      <div className="fr-col-12 fr-col-lg-6">
        <h1 className="fr-mb-6w">{collection.title}</h1>
        <div className="fr-grid-row fr-grid-row--gutters fr-mb-1w">
          <div className="fr-col-12">
            <EditableCard
              id="informations"
              title="Informations de la collection"
              buttons={[
                {
                  children: 'Enregistrer',
                  ...buttonLoadingClassname(isLoading),
                },
              ]}
            >
              <EditableCard.Preview>
                <AttributePreview attribute={collection.title}>
                  Nom de la collection
                </AttributePreview>
                <AttributePreview attribute={collection.description}>
                  Description
                </AttributePreview>
              </EditableCard.Preview>
              <EditableCard.Editing>
                <EditCollectionInformation
                  collection={collection}
                  base={base}
                />
              </EditableCard.Editing>
            </EditableCard>
          </div>
          <div className="fr-col-12">
            {/* <CustomCard id="apercu" title="Aperçu de la collection"> */}
            {/*  <ImageEdition */}
            {/*    control={control} */}
            {/*    disabled={isLoading} */}
            {/*    onChange={setImage} */}
            {/*  /> */}
            {/* </CustomCard> */}
          </div>
          <div className="fr-col-12">
            <EditableCard id="visibilite" title="Visibilité de la collection">
              <EditableCard.Preview>
                <p>
                  Votre collection est publique. Vous pouvez passer votre
                  collection en privé si vous le souhaitez.
                </p>
                <CustomTag
                  color={TagColor.GREEN}
                  icon="fr-icon-earth-fill"
                  label="Base publique"
                />
              </EditableCard.Preview>
              <EditableCard.Editing>TODO</EditableCard.Editing>
            </EditableCard>
          </div>
          <div className="fr-col-12">
            <CustomCard id="supprimer" title="Supprimer la collection">
              <p>
                Cette action est irréversible et entraîne la suppression
                définitive de la collection. Utilisez cette fonction avec
                précaution.
              </p>
              <Button className="fr-btn--danger">
                Supprimer la collection
              </Button>
            </CustomCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionEdition
