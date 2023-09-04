<template>
  <div>
    <table>
      <!-- Header Row -->
      <thead>
        <tr>
          <th>Round #</th>
          <th>Idea 1</th>
          <th>Idea 2</th>
          <th>Idea 3</th>
        </tr>
      </thead>
      <!-- Body Rows -->
      <tbody>
        <tr v-for="(round, index) in ideaCard.rounds" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-for="(idea, ideaIndex) in round.ideas" :key="ideaIndex">
            <q-input
              :disabled="activeRound !== index + 1"
              :value="idea.content"
              @input="updateIdea(index, ideaIndex, $event)"
              label="Idea"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    ideaCard: {
      type: Object,
      required: true,
    },
    activeRound: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    updateIdea(roundIndex, ideaIndex, newValue) {
      // Assume we have deep cloned ideaCard to localIdeaCard
      this.localIdeaCard.rounds[roundIndex].ideas[ideaIndex].content = newValue;
      // Emit updated data to parent
      this.$emit("update:ideaCard", this.localIdeaCard);
    },
  },
  data() {
    return {
      localIdeaCard: JSON.parse(JSON.stringify(this.ideaCard)), // Deep clone
    };
  },
  watch: {
    ideaCard: {
      handler(newVal) {
        this.localIdeaCard = JSON.parse(JSON.stringify(newVal));
      },
      deep: true,
    },
  },
};
</script>
