<template>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else-if="!isAuthenticated">
    <div class="content q-mx-xl">
      <div class="session">
        <h2>{{ session.topic }}</h2>
        <p>Please type in your access code to participate in this session.</p>
        <AppInput v-model="accessCode" label="Access Code" type="text" />
        <q-btn label="Submit" color="primary" @click="checkAccessCode" />
      </div>
    </div>
  </div>
  <div v-else class="content q-mx-xl">
    <div class="session">
      <h4>Hello, {{ userFullName }}</h4>
      <h2>{{ session.topic }}</h2>
      <template v-if="sessionStage === 'not-started'">
        <SessionActionBefore :session="session" />
      </template>
      <template v-else-if="sessionStage === 'started'">
        <SessionActionIdeaGeneration
          :idea-card="session.ideaCards ? session.ideaCards[0] : mockIdeaCard"
          :active-round="1"
          @finished="submitInput"
        />
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
import AppInput from "src/components/forms/AppInput.vue";

const $q = useQuasar();
const route = useRoute();
const { getSession } = useFirestore();

const sessionUrl = route.params.sessionUrl;

const session = ref(null);
const loading = ref(true);
const isAuthenticated = ref(false);
const accessCode = ref("");
const userFullName = ref("");
const userIndex = ref(-1);
const nextIdeaFormIndex = ref(-1);

async function fetchSessionData() {
  session.value = await getSession(sessionUrl);
  loading.value = false;
}

function checkAccessCode() {
  userIndex.value = session.value.contributors.findIndex(
    (x) => x.password === accessCode.value
  );
  if (userIndex.value > -1) {
    isAuthenticated.value = true;
    userFullName.value = session.value.contributors[userIndex.value].name;
    nextIdeaFormIndex.value = userFullName.value;
    $q.notify({
      message: "You are now authenticated",
      color: "info",
      icon: "check",
    });
  } else {
    $q.notify({
      message: "The access code is incorrect",
      color: "negative",
      icon: "close",
    });
  }
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
  return "started";
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

const mockIdeaCard = {
  id: "mock",
  rounds: [
    {
      contributor: "John Doe",
      ideas: [
        {
          content: "Idea 1",
        },
        {
          content: "Idea 2",
        },
        {
          content: "Idea 3",
        },
      ],
    },
  ],
};
</script>
