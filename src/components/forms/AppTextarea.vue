<template>
  <q-input filled v-bind="$attrs" v-model="innerValue" type="textarea" />
</template>

<script setup>
import { ref, toRefs, watch } from "vue";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);
const { modelValue } = toRefs(props);
const innerValue = ref(modelValue.value);

watch(innerValue, (newVal) => {
  emit("update:modelValue", newVal);
});
</script>

<style scoped>
/* Custom styles to make it "modern and simplistic" */
</style>
