<template>
  <AnimatedCountdown
    label="Time until we start"
    :timestamp="session.startingTime"
    @finished="emit('start')"
  />
  <p>Starting time: {{ userFriendlyStartingTime }}</p>
  <h6>Please, be on time!</h6>
</template>

<script setup>
import AnimatedCountdown from "src/components/AnimatedCountdown.vue";
import { computed } from "vue";

const props = defineProps({
  session: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["start"]);

const userFriendlyStartingTime = computed(() => {
  const date = new Date(props.session.startingTime);
  return date.toLocaleString();
});
</script>
