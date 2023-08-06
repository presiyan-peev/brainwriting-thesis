<template>
  <q-list bordered>
    <q-expansion-item
      v-for="{ question, answer } in faq"
      :key="question"
      :label="question"
    >
      {{ answer }}
    </q-expansion-item>
  </q-list>
</template>

<script setup>
const faq = [
  {
    question: "What is Brainwriting?",
    answer:
      "Brainwriting is a non-verbal brainstorming technique where participants write down their ideas, ensuring equal contribution from all. It aims to avoid verbal overshadowing and allows every participant to share their ideas without interruptions.",
  },
  {
    question: "How is Brainwriting different from Brainstorming?",
    answer:
      "While brainstorming involves verbal communication of ideas, brainwriting emphasizes writing them down. This ensures that everyone has an equal opportunity to share their thoughts without the fear of being overshadowed by more vocal participants.",
  },
  {
    question: "Do I need an account to start a session?",
    answer:
      "No, you don't need an account. You can quickly start a session and share the unique URL with participants. However, creating an account can help you manage and save your sessions for future reference.",
  },
  {
    question: "Is there a time limit for each Brainwriting session?",
    answer:
      "By default, there's no set time limit for each session. However, it's recommended to limit the time for each round to encourage quick and spontaneous idea generation.",
  },
  {
    question: "Can I use this tool for remote teams?",
    answer:
      "Absolutely! The digital nature of the tool makes it ideal for remote teams. All participants need is the session URL to join and contribute.",
  },
  {
    question: "How secure are my sessions?",
    answer:
      "Each session is protected with a unique, obscure URL. An optional PIN provides an extra layer of security. We prioritize your privacy and ensure data is encrypted and securely stored.",
  },
  {
    question: "Can I download or export the session results?",
    answer:
      "Yes, as an admin, you have the option to download a comprehensive report of the session, including all ideas, votes, ratings, and analytics.",
  },
  {
    question:
      "What happens if a participant disconnects or refreshes the page?",
    answer:
      "If a participant disconnects or refreshes, they can re-enter the session using the same URL. Their name and contributions will be retained as long as they enter with the same name.",
  },
  {
    question: "Is there any cost associated with using this tool?",
    answer:
      "This tool is offered free of charge, making it accessible for all to foster creativity and collaboration.",
  },
];
</script>

<style scoped>
/* You can style the q-expansion-item or q-list if needed */
</style>
