<template>
  <div class="q-ma-xl">
    Discussions have ended... You can check the filled-in idea cards and the
    discussion notes
  </div>
  <q-pagination v-model="current" :max="6" />
  <IdeaForm :idea-card="session.ideaCards[current - 1]" />
</template>

<script setup>
import { ref } from "vue";
import IdeaForm from "src/components/IdeaForm.vue";

const { session } = defineProps({
  session: {
    type: Object,
    required: true,
  },
});

const current = ref(1);
</script>
