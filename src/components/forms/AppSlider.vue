<template>
  <q-slider v-bind="$attrs" v-model="innerValue" dense class="bg-primary" />
</template>

<script setup>
import { ref, toRefs, watch } from "vue";

const props = defineProps({
  modelValue: Number,
});

const emit = defineEmits(["update:modelValue"]);
const { modelValue } = toRefs(props);
const innerValue = ref(modelValue.value);

watch(innerValue, (newVal) => {
  emit("update:modelValue", newVal);
});
</script>

<style scoped>
/* Custom styles for "modern and simplistic" */
</style>
