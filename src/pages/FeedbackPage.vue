<template>
  <q-page class="flex column flex-center">
    <div>
      <ContactForm />
    </div>
    <div>
      <FAQ />
    </div>
  </q-page>
</template>

<script setup>
import ContactForm from "src/components/forms/ContactForm.vue";
import FAQ from "src/components/FAQ.vue";
</script>
