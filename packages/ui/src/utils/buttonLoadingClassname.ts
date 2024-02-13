export const buttonLoadingClassname = (
  isLoading: boolean,
  className?: string,
) => ({
  className: isLoading ? `${className} fr-btn--loading` : className,
})
