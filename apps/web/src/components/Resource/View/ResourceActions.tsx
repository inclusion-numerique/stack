import { Resource } from '@app/web/server/resources/getResource'
import { SessionUser } from '@app/web/auth/sessionUser'
import styles from './ResourceActions.module.css'

const ResourceActions = ({
  resource,
  user,
  isAdmin,
}: {
  resource: Resource
  user: SessionUser | null
  isAdmin: boolean
}) => {
  const canEdit = isAdmin

  return (
    <div className={styles.container}>
      <div>Left actions</div>
      <div>Right actions</div>
    </div>
  )
}

export default ResourceActions
