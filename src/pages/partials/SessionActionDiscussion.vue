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
    <q-tabs v-model="tab" no-caps class="text-teal">
      <q-tab name="notes" icon="mail" label="Notes by Moderator" />
      <q-tab name="cards" icon="alarm" label="All Idea Cards" />
    </q-tabs>
    <q-tab-panels>
      <q-tab-panel>
        <div class="q-mt-md q-mb-sm">Notes by moderator:</div>
        <AppTextarea :readonly="userIndex !== 0" rows="10" />
      </q-tab-panel>
      <q-tab-panel>
        <div class="q-mt-md q-mb-sm">All idea cards:</div>
        <div class="idea-cards flex">
          <IdeaForm
            v-for="(ideaCard, i) in ideaCards"
            :key="i"
            :idea-card="ideaCard"
            class="q-mr-sm"
          />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import AudioStreamControls from "src/components/AudioStreamControls.vue";
import IdeaForm from "src/components/IdeaForm.vue";
import { ref } from "vue";

const { waitingForCallToStart, userIndex } = defineProps({
  waitingForCallToStart: Boolean,
  userIndex: Number,
  ideaCards: Array,
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
