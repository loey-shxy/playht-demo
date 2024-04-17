import { playHTHttp } from '../http/event-stream-http'
export interface VioceUrlParams {
    text: string
    voice: string
    output_format: string
    voice_engine: string
}
export const getVoiceUrlApi = async (data: VioceUrlParams) => {
    return await playHTHttp.post({
        url: '/v2/tts',
        data
    })
}