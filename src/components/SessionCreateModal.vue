<template>
  <q-dialog>
    <q-card class="q-px-lg q-py-xl">
      <PreskoForm
        title="Presko Form"
        :fields="sessionFields"
        submit-component="AppSubmit"
        @input="handleFormInput"
        @submit="submitSession"
        @submit:reject="alertFormValidationFail"
      />
    </q-card>
  </q-dialog>
</template>

<script setup>
import PreskoForm from "presko-form";
import { useFirestore } from "src/composables/useFirestore";

const { addSession } = useFirestore();

function alertFormValidationFail() {
  alert("validation failed");
}

function handleFormInput(e) {
  console.log(e);
}

const sessionFields = [
  {
    propertyName: "topic",
    component: "AppInput",
    rules: ["required"],
    value: "",
    props: {
      label: "Topic",
    },
  },
  {
    propertyName: "description",
    component: "AppTextarea",
    rules: [],
    value: "",
    props: {
      label: "Description",
    },
  },
  {
    propertyName: "url",
    component: "AppInput",
    rules: [],
    value: Date.now(),
    props: {
      label: "Session URL",
    },
  },
  {
    propertyName: "adminUrl",
    component: "AppInput",
    rules: [],
    value: Date.now(),
    props: {
      label: "Admin URL",
    },
  },
  {
    propertyName: "minutesPerRound",
    component: "AppSlider",
    rules: [],
    value: 5,
    props: {
      label: "Minutes per Round",
    },
  },
  {
    propertyName: "timeBetweenRounds",
    component: "AppSlider",
    rules: [],
    value: 2,
    props: {
      label: "Time Between Rounds",
    },
  },
  {
    propertyName: "startingTime",
    component: "AppDateTimePicker",
    rules: [],
    value: new Date(),
    props: {
      label: "Starting Time",
    },
  },
];

function submitSession(e) {
  alert(JSON.stringify(e));
  addSession(e);
}
</script>
