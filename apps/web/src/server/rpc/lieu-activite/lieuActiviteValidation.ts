import z from 'zod'

export const lieuActiviteValidation = z
  .string({
    required_error: "Veuillez renseigner l'id du lieu d'activité",
  })
  .uuid()
