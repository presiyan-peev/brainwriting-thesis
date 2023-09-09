<template>
  <div>
    <h3>Session Admin</h3>
    <h1 v-if="session">{{ session.topic }}</h1>
  </div>
  <div v-if="sessionStage" class="discussing">
    <q-btn
      label="Start Conference Call"
      color="accent"
      :loading="loading"
      @click="createRoom(sessionUrl)"
    />
  </div>
  <BaseAudio
    v-if="remoteStream && remoteStream != null"
    :remoteStream="remoteStream"
  />
</template>

<script setup>
import BaseAudio from "src/components/BaseAudio.vue";
import { useFirestore } from "src/composables/useFirestore";
import { useWebRTC } from "src/composables/useWebRTC";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const { getSession, updateSessionIdeaCard } = useFirestore();
const { remoteStream, createRoom } = useWebRTC();
const route = useRoute();
const session = ref(null);
const sessionUrl = route.params.sessionUrl;
const loading = ref(false);

async function fetchSessionData() {
  session.value = null;
  session.value = await getSession(sessionUrl);
  loading.value = false;
}

const sessionStage = computed(() => {
  return "discussing";
  const now = Date.now();
  if (now < session.value.startingTime) {
    return "not-started";
  } else if (now < session.value.endingTime) {
    return "generating-ideas";
  } else {
    return "ended";
  }
});

onMounted(() => {
  fetchSessionData();
});
</script>
