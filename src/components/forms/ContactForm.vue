<template>
  <div
    @click="openMailClient"
    class="text-body cursor-pointer flex items-center"
  >
    Got an innovative idea or a burning question? 🚀 Reach out to us at
    <span class="q-ml-sm q-mr-xs">{{ CONTACT_EMAIL }}</span>
    <q-icon name="content_copy" @click.stop="copyToClipboard" />
  </div>
</template>

<script setup>
import { useNotify } from "src/composables/useNotify";

const { notifyPositive, notifyNegative } = useNotify();

const CONTACT_EMAIL = "presiyan.peev@fdiba.tu-sofia.bg";

function openMailClient() {
  window.location.href = `mailto:${CONTACT_EMAIL}`;
}

function copyToClipboard() {
  navigator.clipboard.writeText(CONTACT_EMAIL).then(
    () => {
      notifyPositive("Email copied to clipboard!");
    },
    (err) => {
      notifyNegative("Failed to copy email!");
    }
  );
}
</script>
