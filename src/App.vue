
<template>
  <div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { getVoiceUrlApi } from './apis/event-stream';
import * as PlayHT from 'playht'

// const { VITE_PLAYHT_API_KEY, VITE_PLAYHT_USER_ID } = import.meta.env
onMounted(async () => {
  const data = await getVoiceUrlApi({
      text: 'Hello from a realistic voice.',
      voice: 's3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json',
      output_format: 'mp3',
      voice_engine: 'PlayHT2.0'
  })

  const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
  const result = (data as any).match(reg)
  console.log(result)
  // console.log(data.charAt(''))
})

// onMounted(() => {
//   initPlayHT()
// })

// const initPlayHT = async () => {

//   // Initialize PlayHT API with your credentials
//   PlayHT.init({
//     apiKey: VITE_PLAYHT_API_KEY,
//     userId: VITE_PLAYHT_USER_ID,
//   });

//   // configure your stream
//   const streamingOptions: any = {
//     // must use turbo for the best latency
//     voiceEngine: "PlayHT2.0-turbo",
//     // this voice id can be one of our prebuilt voices or your own voice clone id, refer to the`listVoices()` method for a list of supported voices.
//     voiceId:
//       "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
//     // you can pass any value between 8000 and 48000, 24000 is default
//     sampleRate: 44100,
//     // the generated audio encoding, supports 'raw' | 'mp3' | 'wav' | 'ogg' | 'flac' | 'mulaw'
//     outputFormat: 'mp3',
//     // playback rate of generated speech
//     speed: 1,
//   };

//   // start streaming!
//   const text = "Hey, this is Jennifer from Play. Please hold on a moment, let me just um pull up your details real quick."
//   const stream = await PlayHT.stream(text, streamingOptions);

//   stream.on("data", (chunk) => {
//     console.log(chunk)
//     // Do whatever you want with the stream, you could save it to a file, stream it in realtime to the browser or app, or to a telephony system
//   });

// }
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
