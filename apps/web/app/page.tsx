import { getMyContent } from '@/actions'
import { GlobalPlayer } from '@/components/global-player'
import { RecordingsList } from '@/components/recordings-list'

export default async function RecordingsPage() {
  const contents = await getMyContent()
  return (
   <>
    <RecordingsList contents={contents} />
    <GlobalPlayer/>
   </>
  )
}

