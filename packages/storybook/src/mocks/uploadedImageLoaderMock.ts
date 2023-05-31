/**
 * We use local images in storybook, so we need to mock the image loader
 */
export const uploadedImageLoaderMock = ({ src }: { src: string }) =>
  `/uploads/images/${src}`
