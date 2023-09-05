<template>
  <div v-if="loading">
    <q-spinner-gears />
    <span> Waiting for next idea card to be revealed... </span>
  </div>
  <div v-else class="actions">
    <AnimatedCountdown
      :timestamp="fiveMinutesFromNow"
      @finished="submitInput"
    />
    <q-btn @click="submitInput">Submit</q-btn>
    <IdeaForm
      v-if="ideaCard"
      :idea-card="ideaCard"
      :active-round="activeRound"
      :key="activeRound"
      @update:ideaCard="storeInput"
    />
  </div>
</template>

<script setup>
import IdeaForm from "src/components/IdeaForm.vue";
import AnimatedCountdown from "src/components/AnimatedCountdown.vue";

const props = defineProps({
  ideaCard: {
    type: Object,
  },
  activeRound: {
    type: Number,
  },
  loading: Boolean,
});

const emit = defineEmits(["finished"]);

let input = {};

function storeInput(newInput) {
  input = newInput;
  console.log(input);
}

function submitInput() {
  emit("finished", input);
}

const now = new Date();
const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000 + 1000);
</script>
