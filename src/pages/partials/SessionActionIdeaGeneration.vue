<template>
  <div class="actions">
    <IdeaForm v-if="round" :round="round" @input="submitInput" />
  </div>
</template>

<script setup>
import IdeaForm from "src/components/IdeaForm.vue";

const props = defineProps({
  session: {
    type: Object,
    required: true,
  },
  round: {
    type: Number,
    required: true,
  },
});
</script>
