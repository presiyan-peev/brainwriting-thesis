<template>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else class="content">
    <div class="session">
      <h2>{{ session.topic }}</h2>
      <AnimatedCountdown :timestamp="session.startingTime" />
      <p>Starting time: {{ userFriendlyStartingTime }}</p>
      <p>You can still contribute to the idea</p>
      <div class="actions">
        <q-input v-model="ideaContribution" outlined type="textarea" />
        <button @click="submitContribution">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useFirestore } from "src/composables/useFirestore";
import { useQuasar } from "quasar";
import AnimatedCountdown from "src/components/AnimatedCountdown.vue";

const $q = useQuasar();
const route = useRoute();
const { getSession } = useFirestore();

const sessionUrl = route.params.sessionUrl;

const session = ref(null);
const loading = ref(true);

const ideaContribution = ref("");

async function fetchSessionData() {
  session.value = await getSession(sessionUrl);
  loading.value = false;
}

/**
 * Calls a Snackbar to show a message that the contribution was submitted
 */
const submitContribution = () => {
  $q.notify({
    message: "Your contribution was submitted",
    color: "positive",
    icon: "check",
  });
};

const remainingTime = computed(() => {
  const now = new Date();
  const sessionStart = new Date(session.value.startingTime);
  const diff = sessionStart.getTime() - now.getTime();
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hours = Math.floor(diff / 1000 / 60 / 60 - days * 24);
  const minutes = Math.floor(diff / 1000 / 60 - days * 24 * 60 - hours * 60);
  const seconds = Math.floor(
    diff / 1000 - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60
  );

  let remainingTime = "";
  if (days > 0) {
    remainingTime += `${days} days, `;
  }
  if (hours > 0) {
    remainingTime += `${hours} hours, `;
  }
  if (minutes > 0) {
    remainingTime += `${minutes} minutes, `;
  }
  if (seconds > 0) {
    remainingTime += `${seconds} seconds`;
  }
  return remainingTime;
});

const userFriendlyStartingTime = computed(() => {
  const date = new Date(session.value.startingTime);
  return date.toLocaleString();
});

onMounted(() => {
  fetchSessionData();
});
</script>
