export type ImageWithName = File & { filename: string }

export type CroppedImageInformation = {
  cropHeight?: number
  cropWidth?: number
  cropTop?: number
  cropLeft?: number
}

export type CroppedImageType = CroppedImageInformation & {
  file?: File
  id?: string
}
