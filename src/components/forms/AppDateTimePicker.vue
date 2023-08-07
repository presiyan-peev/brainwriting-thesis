<template>
  <q-datetime-picker
    v-bind="$attrs"
    v-model="innerValue"
    mask="YYYY-MM-DDTHH:mm:ss.SSSZ"
    class="bg-primary"
  />
</template>

<script setup>
import { ref, toRefs, watch } from "vue";

const props = defineProps({
  modelValue: [String, Date],
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
