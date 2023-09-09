<template>
  <div v-if="waitingForCallToStart == true">
    <div v-if="!hasJoinedCall">
      <p class="q-mr-sm">Are you ready to join the call?</p>
      <q-btn label="Yes" @click="joinCall"></q-btn>
    </div>
    <div v-else>Waiting for call to start... Please be patient</div>
  </div>
  <div v-else>it's the call mate</div>
  <BaseAudio
    v-if="remoteStream && remoteStream != null"
    :remoteStream="remoteStream"
  />
</template>

<script setup>
import BaseAudio from "src/components/BaseAudio.vue";
import { ref } from "vue";

const { waitingForCallToStart, remoteStream } = defineProps({
  waitingForCallToStart: Boolean,
  remoteStream: MediaStream,
});

const emit = defineEmits(["joinCall"]);

const hasJoinedCall = ref(false);

function joinCall() {
  hasJoinedCall.value = true;
  emit("joinCall");
}
</script>
