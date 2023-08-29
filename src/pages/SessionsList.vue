<template>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else>
    <div class="sessions-list">
      <div class="sessions-list__header">
        <h1 class="sessions-list__title">Brainstorming Sessions</h1>
        <q-btn
          @click="createSession"
          color="primary"
          icon="add"
          label="Create Session"
        />
      </div>
      <div class="sessions-list__content">
        <q-list bordered>
          <q-item
            v-for="session in sessions"
            :key="session.id"
            clickable
            @click="goToSession(session.id)"
          >
            <q-item-section>
              <q-item-label>{{ session.topic }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>{{ session.startingTime }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useFirestore } from "src/composables/useFirestore";
import { useRouter } from "vue-router";

const router = useRouter();
const { fetchListOfSessions } = useFirestore();
const loading = ref(true);
const sessions = ref([]);

onMounted(async () => {
  sessions.value = await fetchListOfSessions();
  loading.value = false;
});

function createSession() {
  this.$router.push({ name: "SessionCreate" });
}

function goToSession(id) {
  router.push({ name: "SessionDetails", params: { id: id } });
}
</script>
