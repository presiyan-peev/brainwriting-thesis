<template>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else class="content">
    <div class="session">
      <h2>{{ session.topic }}</h2>
      <p>{{ session.startingTime }}</p>
      <div class="actions">
        <button @click="deleteSession">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFirestore } from "src/composables/useFirestore";

const route = useRoute();
const { getSession } = useFirestore();

const sessionUrl = route.params.sessionUrl;

const session = ref(null);
const loading = ref(true);

async function fetchSessionData() {
  session.value = await getSession(sessionUrl);
  loading.value = false;
}

onMounted(() => {
  fetchSessionData();
});

function deleteSession() {
  this.$router.push({ name: "SessionsList" });
}
</script>
