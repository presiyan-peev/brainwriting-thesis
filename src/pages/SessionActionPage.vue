<template>{{ sessionUrl }}</template>

<script setup>
import { useRoute } from "vue-router";
import { useFirestore } from "src/composables/useFirestore";

const route = useRoute();
const { getSession } = useFirestore();

const sessionUrl = route.params.sessionUrl;
</script>
