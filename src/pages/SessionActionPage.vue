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
      <template v-else-if="sessionStage === 'generating-ideas'">
        <SessionActionIdeaGeneration
          :idea-card="
            session.ideaCards
              ? session.ideaCards[nextIdeaFormIndex]
              : mockIdeaCard
          "
          :active-round="activeRound"
          :loading="waitingForNextRound"
          @finished="submitInput"
        />
      </template>
      <template v-else-if="sessionStage === 'discussing'">
        <SessionActionDiscussion
          :waiting-for-call-to-start="!hasJoinedCall"
          :user-index="userIndex"
          @join-call="tryJoinChannel"
        />
      </template>
      <template v-else-if="sessionStage === 'ended'">
        <SessionActionClosed :session="session" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, provide } from "vue";
import { useRoute } from "vue-router";
import { useFirestore } from "src/composables/useFirestore";
import { useQuasar } from "quasar";
import { useAgora } from "src/composables/useAgora";

import SessionActionBefore from "src/pages/partials/SessionActionBefore.vue";
import SessionActionIdeaGeneration from "src/pages/partials/SessionActionIdeaGeneration.vue";
import SessionActionDiscussion from "src/pages/partials/SessionActionDiscussion.vue";
import SessionActionClosed from "src/pages/partials/SessionActionClosed.vue";
import AppInput from "src/components/forms/AppInput.vue";

const $q = useQuasar();
const route = useRoute();
const { getSession, updateSessionIdeaCard } = useFirestore();
const {
  hasJoinedCall,
  initOptions,
  tryJoinChannel,
  startBasicCall,
  leaveCall,
  channelParameters,

  isMuteAudio,
  localAudioVolume,
  remoteAudioVolume,
  toggleMute,
  setLocalAudioVolume,
  setRemoteAudioVolume,
} = useAgora();

// TODO - move to be executed when discussion starts
startBasicCall();

provide("isMuteAudio", isMuteAudio);
provide("localAudioVolume", localAudioVolume);
provide("remoteAudioVolume", remoteAudioVolume);
provide("toggleMute", toggleMute);
provide("setLocalAudioVolume", setLocalAudioVolume);
provide("setRemoteAudioVolume", setRemoteAudioVolume);

const sessionUrl = route.params.sessionUrl;

const session = ref(null);
const loading = ref(true);
const isAuthenticated = ref(false);
const accessCode = ref("");
const userFullName = ref("");
const activeRound = ref(1);
const userIndex = ref(-1);
const nextIdeaFormIndex = ref(-1);
const waitingForNextRound = ref(false);
const waitingForDiscussionCallToStart = ref(true);

async function fetchSessionData() {
  session.value = null;
  session.value = await getSession(sessionUrl);
  loading.value = false;
}

function checkAccessCode() {
  userIndex.value = session.value.contributors.findIndex(
    (x) => x.password === accessCode.value
  );
  if (userIndex.value > -1) {
    userFullName.value = session.value.contributors[userIndex.value].name;
    initOptions({ uid: userFullName.value });
    nextIdeaFormIndex.value = userIndex.value;
    $q.notify({
      message: "You are now authenticated",
      color: "info",
      icon: "check",
    });
    isAuthenticated.value = true;
  } else {
    $q.notify({
      message: "The access code is incorrect",
      color: "negative",
      icon: "close",
    });
  }
}

function fetchNextIdeaCard() {
  incrementIdeaFormIndex();
  if (activeRound.value == 6) {
    waitingForDiscussionCallToStart.value = true;
    // TODO MAINA
    return;
  }
  setTimeout(() => {
    fetchSessionData();
    activeRound.value++;
    waitingForNextRound.value = false;
  }, 2000);
}

function incrementIdeaFormIndex() {
  if (nextIdeaFormIndex.value === session.value.contributors.length - 1) {
    nextIdeaFormIndex.value = 0;
  } else {
    nextIdeaFormIndex.value++;
  }
}

/**
 * Calls a Snackbar to show a message that the contribution was submitted
 */
const submitInput = (e) => {
  try {
    updateSessionIdeaCard(sessionUrl, userIndex.value, e);
    $q.notify({
      message: "Your contribution was submitted",
      color: "info",
      icon: "check",
    });
    waitingForNextRound.value = true;
    fetchNextIdeaCard();
  } catch (error) {
    console.log(error);
    $q.notify({
      message: "There was an error submitting your contribution",
      color: "negative",
      icon: "close",
    });
  }
};

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

const emptyRow = {
  ideas: [
    {
      content: "",
    },
    {
      content: "",
    },
    {
      content: "",
    },
  ],
};
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
    { ...emptyRow },
    { ...emptyRow },
    { ...emptyRow },
    { ...emptyRow },
    { ...emptyRow },
  ],
};
</script>
