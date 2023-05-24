'use client'

import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TRPCClientErrorLike } from '@trpc/client'
import { UseTRPCQueryResult } from '@trpc/react-query/dist/shared'
import { inferRouterOutputs } from '@trpc/server'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { AddContentCommand } from '@app/web/server/resources/feature/AddContent'
import { EditContentCommand } from '@app/web/server/resources/feature/EditContent'
import { AppRouter } from '@app/web/server/rpc/appRouter'
import {
  linkCaptionMaxLength,
  linkTitleMaxLength,
} from '@app/web/server/rpc/resource/utils'
import LinkPreview from './LinkPreview'

const titleInfo = (title: string | null) =>
  `${title?.length ?? 0}/${linkTitleMaxLength} caractères`

const captionInfo = (caption: string | null) =>
  `${caption?.length ?? 0}/${linkCaptionMaxLength} caractères`

export type LinkEditionProps = {
  form: UseFormReturn<AddContentCommand | EditContentCommand>
  metaData: UseTRPCQueryResult<
    inferRouterOutputs<AppRouter>['metaData']['get'],
    TRPCClientErrorLike<AppRouter>
  > | null
}

const LinkEdition = ({
  form: { control, watch, setValue, getValues },
  metaData,
}: LinkEditionProps) => {
  const title = watch('payload.title')
  const caption = watch('payload.caption')

  useEffect(() => {
    if (metaData && metaData.isSuccess) {
      setValue('payload.linkDescription', metaData.data.description, {
        shouldDirty: true,
      })
      setValue('payload.linkTitle', metaData.data.title, { shouldDirty: true })
    }
  }, [metaData, setValue])

  return (
    <>
      <InputFormField
        data-testid="link-title-input"
        control={control}
        path="payload.title"
        label="Titre du lien"
        info={titleInfo(title)}
      />
      <InputFormField
        data-testid="link-url-input"
        control={control}
        path="payload.url"
        label="Copiez le lien de l'URL ici"
        placeholder="https://"
      />
      <CheckboxFormField
        data-testid="link-show-preview-radio"
        control={control}
        path="payload.showPreview"
        label="Afficher un aperçu visuel du lien"
      />
      {metaData && metaData.isSuccess && (
        <LinkPreview
          content={{
            linkTitle: metaData.data.title,
            linkDescription: metaData.data.description,
            url: getValues('payload.url'),
          }}
        />
      )}
      <InputFormField
        type="textarea"
        data-testid="link-caption-input"
        control={control}
        path="payload.caption"
        label="Légende"
        info={captionInfo(caption)}
      />
    </>
  )
}

export default LinkEdition
