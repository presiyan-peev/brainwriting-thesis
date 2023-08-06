<template>
  <section>
    <div class="text-h4 q-mb-md">Quick Guide</div>

    <!-- Steps -->
    <ol class="custom-list">
      <li v-for="step in steps" :key="step.title" class="step-item q-my-md">
        <div class="text-h6 q-mb-sm">{{ step.title }}</div>
        <div>{{ step.description }}</div>
      </li>
    </ol>
  </section>

  <!-- Conclusion -->
  <section class="conclusion text-center q-mt-xl">
    <div>
      Brainwriting is an effective way to get diverse ideas from a group. With
      this tool, the process becomes easier and more organized. Dive in and
      start brainstorming!
    </div>
    <q-btn
      color="primary"
      rounded
      label="Start brainstorming"
      class="start-button q-my-md"
    />
  </section>
</template>

<script setup>
const steps = [
  {
    title: "What is this Brainwriting technique?",
    description:
      "In this nonverbal brainstorming method, everyone writes down three ideas that relate to the topic of the brainstorm. Allow about four to six minutes for this process. Then everyone passes their ideas to the person on their right (or left, whichever you prefer), who will then build off of the ideas, adding bullet points or creative strategies. If your team is remote, they can use a communications platform like Slack to share ideas. After another few minutes, everyone will pass the piece of paper again until it makes it all the way around the table. Once the ideas have made it around the circle, the group discusses them and decides which ideas are best to pursue. This technique can alleviate two of the biggest brainstorm pitfalls—unbalanced conversation and the anchoring effect—by ensuring that everyone has the opportunity to contribute and eliminating the bias toward the first idea.",
  },
  {
    title: "Starting with the Tool",
    description:
      "Go to the Landing Page. Click on 'Start Brainstorming'. Set the brainstorming topic or question. You'll receive a unique session URL – one for admin (you) and another for participants.",
  },
  {
    title: "Sharing the Session",
    description:
      "Share the participant URL with your team or participants. They'll be prompted to enter their name upon accessing the URL.",
  },
  {
    title: "Brainwriting Process",
    description:
      "Participants write down their ideas on the Participant Session Page. After the set time, ideas will be shuffled among participants for further iteration. This process continues until the rounds are completed.",
  },
  {
    title: "Discussion Phase",
    description:
      "After Brainwriting, move to the Discussion Page. Here, all ideas are listed for discussion, voting, and rating. Participants can comment on, upvote, or rate the ideas.",
  },
  {
    title: "Concluding the Session",
    description:
      "As the admin, you can conclude the session from the Admin Session Page. This moves the session to the Summary/Report Page, showing all ideas, votes, ratings, and analytics.",
  },
  {
    title: "Reviewing the Summary",
    description:
      "Access the Summary/Report Page to view a comprehensive report. The admin has the option to download this report.",
  },
  {
    title: "Session Security",
    description:
      "Each session is protected by a unique, obscure URL. An optional PIN provides an extra layer of security.",
  },
  {
    title: "Feedback",
    description:
      "After a session ends, consider providing feedback about the tool. This helps in the tool's continuous improvement.",
  },
  {
    title: "Tips and Tricks",
    description:
      "Ensure a stable internet connection. Use concise, clear language for your ideas. Engage actively in the discussion phase.",
  },
];
</script>

<style scoped>
.start-button {
  width: 200px;
}

.custom-list {
  width: 80%;
  list-style-type: decimal;
  padding-left: 2em;
}

.step-item {
  width: 100%;
}
</style>
