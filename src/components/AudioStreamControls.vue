<template>
  <q-field outlined class="audio-stream-controls q-pa-sm">
    <q-btn :label="isMuteAudio ? 'Unmute' : 'Mute'" @click="toggleMute" />
    <!-- <AppSlider
      :model-value="localAudioVolume"
      :min="0"
      :max="100"
      :step="5"
      text="Mic Volume"
      @update:model-value="setLocalAudioVolume"
    /> -->
    <q-separator vertical class="q-my-xs" />
    <AppSlider
      class="q-my-auto q-ml-sm"
      :model-value="remoteAudioVolume"
      :min="0"
      :max="100"
      :step="5"
      @update:model-value="setRemoteAudioVolume"
      style="width: 150px"
    />
  </q-field>
</template>

<script setup>
import { inject } from "vue";

const isMuteAudio = inject("isMuteAudio");
const localAudioVolume = inject("localAudioVolume");
const remoteAudioVolume = inject("remoteAudioVolume");
const toggleMute = inject("toggleMute");
const setLocalAudioVolume = inject("setLocalAudioVolume");
const setRemoteAudioVolume = inject("setRemoteAudioVolume");
</script>

<style scoped lang="sass">
.audio-stream-controlss
  border: 1px solid #3333DD77
</style>
