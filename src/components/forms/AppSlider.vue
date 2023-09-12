<template>
  <div class="flex">
    <span v-if="text">{{ text }}</span>
    <q-slider
      v-bind="$attrs"
      :model-value="modelValue"
      :label="true"
      @update:model-value="updateModelValue"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const {
  modelValue: propValue,
  text,
  type,
} = defineProps(["modelValue", "text", "type"]);
const modelValue = ref(propValue);
const emit = defineEmits(["update:model-value"]);

const updateModelValue = (value) => {
  modelValue.value = value;
  emit("update:model-value", value);
  emit("input", value);
};
</script>

<style scoped>
/* Custom styles for "modern and simplistic" */
</style>
