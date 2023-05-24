import sanitizeHtml from 'sanitize-html'
import z from 'zod'
import {
  linkCaptionMaxLength,
  linkTitleMaxLength,
  resourceTitleMaxLength,
} from '@app/web/server/rpc/resource/utils'

export const contentEditionValues = {
  title: z
    .string({ required_error: 'Veuillez renseigner le titre' })
    .trim()
    .nonempty('Veuillez renseigner le titre')
    .max(
      resourceTitleMaxLength,
      `Le titre ne doit pas dépasser ${resourceTitleMaxLength} caractères`,
    ),
  text: z
    .string({ required_error: 'Veuillez renseigner le texte' })
    .trim()
    .nonempty('Veuillez renseigner le texte')
    .transform((text) => sanitizeHtml(text)),
}

const SectionTitlePayloadCommandValidation = z.object({
  type: z.literal('SectionTitle'),
  title: contentEditionValues.title,
})

const TextPayloadCommandValidation = z.object({
  type: z.literal('Text'),
  text: contentEditionValues.text,
})

const ImagePayloadCommandValidation = z.object({
  type: z.literal('Image'),
})

const LinkPayloadCommandValidation = z.object({
  type: z.literal('Link'),
  title: z
    .string({ required_error: 'Veuillez renseigner le titre' })
    .trim()
    .nonempty('Veuillez renseigner le titre')
    .max(
      linkTitleMaxLength,
      `Le titre ne doit pas dépasser ${linkTitleMaxLength} caractères`,
    ),
  url: z
    .string({ required_error: "Veuillez renseigner l'URL" })
    .trim()
    .nonempty("Veuillez renseigner l'URL")
    .url('URL non valide'),
  caption: z
    .string({ required_error: 'Veuillez renseigner la légende' })
    .trim()
    .nonempty('Veuillez renseigner la légende')
    .max(
      linkCaptionMaxLength,
      `La légende ne doit pas dépasser ${linkCaptionMaxLength} caractères`,
    ),
  showPreview: z.boolean().optional(),
  linkDescription: z.string().optional(),
  linkTitle: z.string().optional(),
  linkImageUrl: z.string().optional(),
})

const ResourceLinkPayloadCommandValidation = z.object({
  type: z.literal('ResourceLink'),
})

const FilePayloadCommandValidation = z.object({
  type: z.literal('File'),
})

export const ContentPayloadCommandValidation = z.discriminatedUnion('type', [
  SectionTitlePayloadCommandValidation,
  TextPayloadCommandValidation,
  ImagePayloadCommandValidation,
  LinkPayloadCommandValidation,
  ResourceLinkPayloadCommandValidation,
  FilePayloadCommandValidation,
])
