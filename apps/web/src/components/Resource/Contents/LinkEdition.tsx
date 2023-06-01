'use client'

import { UseFormReturn } from 'react-hook-form'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import {
  linkCaptionMaxLength,
  linkTitleMaxLength,
} from '@app/web/server/rpc/resource/utils'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { ContentPayload } from '@app/web/server/resources/feature/Content'
import { Metadata } from '@app/web/server/rpc/metadata/getMetadataFromDocument'
import DynamicLinkEditionPreview from '@app/web/components/Resource/Contents/DynamicLinkEditionPreview'

const titleInfo = (title?: string | null) =>
  `${title?.length ?? 0}/${linkTitleMaxLength} caractères`

const captionInfo = (caption?: string | null) =>
  `${caption?.length ?? 0}/${linkCaptionMaxLength} caractères`

const LinkEdition = ({
  form: { watch, setValue, getFieldState, control },
}: {
  form: UseFormReturn<ContentPayload>
}) => {
  const showPreview = watch('showPreview')
  const url = watch('url')
  const linkTitle = watch('linkTitle')
  const linkDescription = watch('linkDescription')
  const linkImageUrl = watch('linkImageUrl')
  const urlValid = !!url && !getFieldState('url').invalid

  const onMetadataUpdate = (metadata: Metadata) => {
    setValue('linkDescription', metadata.description, {
      shouldDirty: true,
    })
    setValue('linkTitle', metadata.title, {
      shouldDirty: true,
    })
    setValue('linkImageUrl', metadata.imageUrl, {
      shouldDirty: true,
    })
  }

  return (
    <>
      <InputFormField
        data-testid="link-title-input"
        control={control}
        path="title"
        label="Titre du lien"
        info={titleInfo}
      />
      <InputFormField
        data-testid="link-url-input"
        control={control}
        path="url"
        label="Copiez le lien de l'URL ici"
        placeholder="https://"
      />
      <CheckboxFormField
        data-testid="link-show-preview-radio"
        control={control}
        path="showPreview"
        disabled={!urlValid}
        label="Afficher un aperçu visuel du lien"
      />
      {showPreview && urlValid && (
        <DynamicLinkEditionPreview
          url={url}
          onUpdate={onMetadataUpdate}
          title={linkTitle ?? null}
          description={linkDescription ?? null}
          imageUrl={linkImageUrl ?? null}
        />
      )}
      <InputFormField
        type="textarea"
        data-testid="link-caption-input"
        control={control}
        path="caption"
        label="Légende"
        info={captionInfo}
      />
    </>
  )
}

export default withTrpc(LinkEdition)
