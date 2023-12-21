import CustomTag, { TagColor } from './CustomTag'

const publicValues = {
  color: TagColor.GREEN,
  icon: 'fr-icon-earth-fill',
}

const privateValues = {
  color: TagColor.GREY,
  icon: 'fr-icon-lock-line',
}

export const ProfilePrivacyTag = ({
  isPublic,
  small,
}: {
  isPublic?: boolean
  small?: boolean
}) =>
  isPublic ? (
    <CustomTag {...publicValues} small={small} label="Public" />
  ) : (
    <CustomTag {...privateValues} small={small} label="Privé" />
  )

export const BasePrivacyTag = ({
  isPublic,
  small,
}: {
  isPublic?: boolean
  small?: boolean
}) =>
  isPublic ? (
    <CustomTag {...publicValues} small={small} label="Publique" />
  ) : (
    <CustomTag {...privateValues} small={small} label="Privée" />
  )

export const ResourcePrivacyTag = ({
  isPublic,
  small,
}: {
  isPublic?: boolean
  small?: boolean
}) =>
  isPublic ? (
    <CustomTag {...publicValues} small={small} label="Publique" />
  ) : (
    <CustomTag {...privateValues} small={small} label="Privée" />
  )

export const PrivacyTag = ({
  isPublic,
  small,
  label,
}: {
  isPublic?: boolean
  small?: boolean
  label?: string
}) =>
  isPublic ? (
    <CustomTag {...publicValues} small={small} label={label} />
  ) : (
    <CustomTag {...privateValues} small={small} label={label} />
  )
