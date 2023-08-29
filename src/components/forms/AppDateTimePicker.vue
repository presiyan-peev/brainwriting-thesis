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

const {
  modelValue: propValue,
  datePlaceholder,
  timePlaceholder,
} = defineProps({
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

const emit = defineEmits(["update:model-value", "input"]);

const internalDate = ref("");
const internalTime = ref("");

watch(
  () => propValue,
  (newValue) => {
    timestampToQDate(newValue);
  }
);

watch([internalDate, internalTime], () => {
  console.log("date or time changed");
  console.log(internalDate.value);
  console.log(internalTime.value);
  const input = qDateToTimestamp(internalDate.value, internalTime.value);
  if (isNaN(input)) {
    return;
  }
  emit("update:model-value", input);
  emit("input", input);
});

/**
 * Converts a date and time string to a timestamp
 * @param {string} date
 * @param {string} time
 * @returns {string}
 */
function qDateToTimestamp(date, time) {
  return Date.parse(`${date} ${time}`);
}

/**
 * Converts a timestamp to a date and time string
 * @param {string} propValue
 */
function timestampToQDate(propValue) {
  const date = new Date(propValue);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  internalDate.value = `${year}-${month}-${day}`;
  internalTime.value = `${hours}:${minutes}`;
}
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
