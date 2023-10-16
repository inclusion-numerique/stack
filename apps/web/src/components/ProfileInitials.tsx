import styles from './ProfileInitials.module.css'

const computeInitials = (firstName: string | null, lastName: string | null) => {
  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }
  if (firstName) {
    return firstName.charAt(0)
  }
  if (lastName) {
    return lastName.charAt(0)
  }
  return ''
}

const ProfileInitials = ({
  firstName,
  lastName,
  size,
}: {
  firstName: string | null
  lastName: string | null
  size: number
}) => (
  <span className={styles.initials} style={{ fontSize: size }}>
    {computeInitials(firstName, lastName)}
  </span>
)

export default ProfileInitials
