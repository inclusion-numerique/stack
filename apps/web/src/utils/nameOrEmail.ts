export const nameOrEmail = ({
  email,
  name,
}: {
  name: string | null
  email: string
}) => name || email
