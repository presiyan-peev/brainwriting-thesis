<template>
  <div class="actions">
    <AnimatedCountdown
      :timestamp="fiveMinutesFromNow"
      @finished="submitInput"
    />
    <IdeaForm
      v-if="ideaCard"
      :idea-card="ideaCard"
      :active-round="activeRound"
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
