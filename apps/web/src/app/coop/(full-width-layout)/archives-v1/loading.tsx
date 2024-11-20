import { Spinner } from '@app/web/ui/Spinner'
import ArchivesV1Card from '@app/web/app/coop/(full-width-layout)/archives-v1/ArchivesV1Card'

const Loading = () => (
  <ArchivesV1Card>
    <Spinner />
  </ArchivesV1Card>
)

export default Loading
