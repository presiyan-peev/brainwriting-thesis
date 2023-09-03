<template>
  <q-input
    :model-value="modelValue"
    filled
    v-bind="$attrs"
    @update:model-value="updateModelValue"
    type="textarea"
  />
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
/* Custom styles to make it "modern and simplistic" */
</style>
