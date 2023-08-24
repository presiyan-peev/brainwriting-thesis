<template>{{ session }}</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useFirestore } from "src/composables/useFirestore";

const route = useRoute();
const { getSession } = useFirestore();

const sessionUrl = route.params.sessionUrl;

const session = ref(null);
async function fetchSessionData() {
  session.value = await getSession(sessionUrl);
}

fetchSessionData();
</script>
