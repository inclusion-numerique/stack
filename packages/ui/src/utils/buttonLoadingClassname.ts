export const loadingClass = (isLoading: boolean, className?: string) => ({
  className: isLoading ? `${className} fr-btn--loading` : className
})
