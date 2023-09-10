<template>
  <div class="audio-stream-controls">
    <BaseButton :label="isMuteAudio ? 'Unmute' : 'Mute'" @click="toggleMute" />
    <AppSlider
      :model-value="localAudioVolume"
      label="Local Audio Level"
      min="0"
      max="100"
      step="5"
      @update:model-value="setLocalAudioVolume"
    />
    <AppSlider
      :model-value="remoteAudioVolume"
      label="Remote Audio Level"
      min="0"
      max="100"
      step="5"
      @update:model-value="setRemoteAudioVolume"
    />
  </div>
</template>

<script setup>
import { useAgora } from "src/composables/useAgora";

const {
  isMuteAudio,
  localAudioVolume,
  remoteAudioVolume,
  toggleMute,
  setLocalAudioVolume,
  setRemoteAudioVolume,
} = useAgora();
</script>
