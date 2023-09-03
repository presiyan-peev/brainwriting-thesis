<template>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else class="content q-mx-xl">
    <div class="session">
      <h2>{{ session.topic }}</h2>
      <template v-if="sessionStage === 'not-started'">
        <SessionActionBefore :session="session" />
      </template>
      <template v-else-if="sessionStage === 'started'">
        <SessionActionIdeaGeneration :session="session" />
      </template>
      <template v-else-if="sessionStage === 'ended'">
        <SessionActionClosed :session="session" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useFirestore } from "src/composables/useFirestore";
import { useQuasar } from "quasar";

import SessionActionBefore from "src/pages/partials/SessionActionBefore.vue";
import SessionActionIdeaGeneration from "src/pages/partials/SessionActionIdeaGeneration.vue";
import SessionActionClosed from "src/pages/partials/SessionActionClosed.vue";

const $q = useQuasar();
const route = useRoute();
const { getSession } = useFirestore();

const sessionUrl = route.params.sessionUrl;

const session = ref(null);
const loading = ref(true);

async function fetchSessionData() {
  session.value = await getSession(sessionUrl);
  loading.value = false;
}

/**
 * Calls a Snackbar to show a message that the contribution was submitted
 */
const submitInput = () => {
  $q.notify({
    message: "Your contribution was submitted",
    color: "info",
    icon: "check",
  });
};

const round = computed(() => {});

const sessionStage = computed(() => {
  const now = Date.now();
  if (now < session.value.startingTime) {
    return "not-started";
  } else if (now < session.value.endingTime) {
    return "started";
  } else {
    return "ended";
  }
});

onMounted(() => {
  fetchSessionData();
});
</script>
