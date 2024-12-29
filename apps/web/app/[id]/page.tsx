import { getRecordingById } from '@/actions'
import RecordingDetails from './details'

interface RecordingPageProps {  
    params: Promise<{ id: string }>
}

export default async function RecordingPage({ params }: RecordingPageProps) {
    const paramsResult = await params
    const recording = await getRecordingById(paramsResult.id)
    if (!recording) {
        return <div className="text-white/80 p-4">Recording not found.</div>
    }
    return <RecordingDetails recording={recording} recordingId={paramsResult.id} />
}
