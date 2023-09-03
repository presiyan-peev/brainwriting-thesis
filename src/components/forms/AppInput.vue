<template>
  <q-input
    :model-value="modelValue"
    :placeholder="placeholder"
    :type="type"
    class="app-input"
    :dense="true"
    :debounce="300"
    v-bind="$attrs"
    @update:model-value="updateModelValue"
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
.app-input {
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 8px 12px;
  transition: border 0.3s ease;
}

.app-input:focus-within {
  border-color: #007bff;
}
</style>
