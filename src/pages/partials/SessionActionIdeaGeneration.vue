<template>
  <div class="actions">
    <AnimatedCountdown :timestamp="fiveMinutesFromNow" />
    <IdeaForm
      v-if="ideaCard"
      :idea-card="ideaCard"
      :active-round="activeRound"
      @input="submitInput"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
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

const now = new Date();
const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000 + 1000);
</script>
