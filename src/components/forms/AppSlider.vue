<template>
  <div class="flex">
    <q-slider
      v-bind="$attrs"
      :model-value="modelValue"
      dense
      @update:model-value="updateModelValue"
    />
    <span>{{ modelValue }}</span>
  </div>
</template>

<script setup>
import { ref } from "vue";

const {
  modelValue: propValue,
  placeholder,
  type,
} = defineProps(["modelValue", "placeholder", "type"]);
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
