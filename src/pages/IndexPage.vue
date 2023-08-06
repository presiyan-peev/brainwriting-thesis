<template>
  <q-page class="flex flex-center landing-container">
    <LandingIntro />
    <div>
      <QuickGuide />
    </div>
  </q-page>
</template>

<script setup>
import LandingIntro from "src/components/LandingIntro.vue";
import QuickGuide from "src/components/QuickGuide.vue";
</script>

<style lang="sass" scoped>
.landing-container
  font-family: "Arial", sans-serif
</style>
