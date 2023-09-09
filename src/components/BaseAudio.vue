<template>
  alo
  <audio
    v-if="remoteStream && remoteStream != null"
    autoplay
    controls
    ref="localAudio"
  ></audio>
</template>

<script setup>
import { onMounted, ref } from "vue";

const localAudio = ref(null);
const { remoteStream } = defineProps({
  remoteStream: MediaStream,
});

// Initialize your local stream here
// remoteStream.value = your_stream;

onMounted(() => {
  console.log("Audio Tracks: ", remoteStream);
  console.log("Audio Tracks: ", remoteStream.getAudioTracks());
  localAudio.value.srcObject = remoteStream;
  localAudio.value.play();
});
</script>
