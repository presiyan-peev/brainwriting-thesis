<template>
  <div class="audio-stream-controls">
    <q-btn :label="isMuteAudio ? 'Unmute' : 'Mute'" @click="toggleMute" />
    <AppSlider
      :model-value="localAudioVolume"
      label="Local Audio Level"
      :min="0"
      :max="100"
      :step="5"
      @update:model-value="setLocalAudioVolume"
    />
    <AppSlider
      :model-value="remoteAudioVolume"
      label="Remote Audio Level"
      :min="0"
      :max="100"
      :step="5"
      @update:model-value="setRemoteAudioVolume"
    />
  </div>
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
