<template>
  <div v-if="waitingForCallToStart == true">
    <div v-if="!hasTriedToJoinCall">
      <p class="q-mr-sm">Are you ready to join the call?</p>
      <q-btn label="Join" @click="joinCall"></q-btn>
    </div>
    <div v-else>Waiting for call to start... Please be patient</div>
  </div>
  <div v-else>
    <AudioStreamControls class="audio-controls" />
  </div>
</template>

<script setup>
import AudioStreamControls from "src/components/AudioStreamControls.vue";
import { ref } from "vue";

const { waitingForCallToStart, remoteStream } = defineProps({
  waitingForCallToStart: Boolean,
});

const emit = defineEmits(["joinCall"]);

const hasTriedToJoinCall = ref(false);

function joinCall() {
  hasTriedToJoinCall.value = true;
  emit("joinCall");
}
</script>

<style scoped lang="sass">
.audio-controls
  width: 300px
</style>
