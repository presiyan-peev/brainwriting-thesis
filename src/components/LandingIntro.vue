<template>
  <!-- Section 1 -->
  <section class="window-height flex flex-center column">
    <div class="text-h2 q-mb-sm">Brainstorming</div>
    <div class="text-h2 q-mb-xs">for everybody</div>
    <div class="text-caption q-mb-md q-mt-xs">(including introverts)</div>
    <q-btn
      color="primary"
      rounded
      label="Start brainstorming"
      class="start-button q-mb-md"
      @click="openCreateSessionModal"
    />
    <div>
      Brainwriting is a non-verbal brainstorming technique where participants
      write down their ideas, ensuring equal contribution from all. This tool
      facilitates the Brainwriting process digitally.
    </div>
  </section>
</template>

<script setup>
import SessionCreateModal from "./SessionCreateModal.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const openCreateSessionModal = () => {
  $q.dialog({
    component: SessionCreateModal,

    // props forwarded to your custom component
    componentProps: {
      text: "something",
      // ...more..props...
    },
  })
    .onOk(() => {
      console.log("OK");
    })
    .onCancel(() => {
      console.log("Cancel");
    })
    .onDismiss(() => {
      console.log("Called on OK or Cancel");
    });
};
</script>

<style scoped>
.start-button {
  width: 200px;
}
</style>
