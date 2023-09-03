<template>
  <q-dialog>
    <q-card class="q-px-lg q-py-xl" style="max-width: 80vw; width: 655px">
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
    propertyName: "startingTime",
    component: "AppDateTimePicker",
    rules: [],
    value: new Date(),
    props: {
      label: "Starting Time",
    },
  },
  {
    propertyName: "contributors",
    component: "NamePasswordArrayInput",
    rules: [],
    value: [],
    props: {
      length: 6,
    },
  },
];

function submitSession(e) {
  alert(JSON.stringify({ session: e, id: e.url }));
  addSession({ session: e, id: e.url });
}
</script>
