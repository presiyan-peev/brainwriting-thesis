<template>
  <div class="q-gutter-sm flex">
    <q-date
      v-model="internalDate"
      mask="YYYY-MM-DD"
      :placeholder="datePlaceholder"
      class="app-date-picker"
    />
    <q-time
      v-model="internalTime"
      :placeholder="timePlaceholder"
      class="app-time-picker"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  datePlaceholder: {
    type: String,
    default: "Pick a date",
  },
  timePlaceholder: {
    type: String,
    default: "Pick a time",
  },
});

const emit = defineEmits(["update:modelValue"]);

const internalDate = ref("");
const internalTime = ref("");

watch(
  () => props.modelValue,
  (newValue) => {
    const [date, time] = newValue.split(" ");
    internalDate.value = date;
    internalTime.value = time;
  }
);

watch([internalDate, internalTime], () => {
  emit("update:modelValue", `${internalDate.value} ${internalTime.value}`);
});
</script>

<style scoped>
.app-date-picker,
.app-time-picker {
  border: 1px solid #e0e0e0;
  padding: 8px;
  border-radius: 4px;
}

.app-date-picker:focus,
.app-time-picker:focus {
  outline: none;
  border-color: #2196f3;
}
</style>
