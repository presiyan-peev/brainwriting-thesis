<template>
  <div class="label">Contributors</div>
  <div class="input flex justify-between q-my-md" v-for="n in length">
    <AppInput
      label="Contributor's Name"
      :value="modelValue[n - 1]?.name || ''"
      @update:model-value="updateModelValue(n - 1, 'name', $event)"
    />
    <AppInput
      label="Contributor's Password"
      :value="modelValue[n - 1]?.password || ''"
      @update:model-value="updateModelValue(n - 1, 'password', $event)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppInput from "./AppInput.vue";
const { modelValue: propValue, label } = defineProps({
  modelValue: Array,
  length: Number,
});

const modelValue = ref(propValue);
const emit = defineEmits(["update:model-value", "input"]);

const updateModelValue = (index, key, e) => {
  console.log(index, key, e);
  if (!modelValue.value[index]) {
    modelValue.value[index] = {};
  }
  modelValue.value[index][key] = e;
  emit("update:model-value", modelValue.value);
  emit("input", modelValue.value);
};
</script>
