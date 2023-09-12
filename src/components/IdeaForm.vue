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
        <tr v-for="(round, index) in localIdeaCard.rounds" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-for="(idea, ideaIndex) in round.ideas" :key="ideaIndex">
            <q-input
              label="Idea"
              :model-value="idea.content"
              type="textarea"
              rows="3"
              @update:model-value="updateIdea(index, ideaIndex, $event)"
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
      default: -1,
    },
  },
  data() {
    return {
      localIdeaCard: JSON.parse(JSON.stringify(this.ideaCard)), // Deep clone
    };
  },
  methods: {
    updateIdea(roundIndex, ideaIndex, newValue) {
      console.log(roundIndex, ideaIndex, newValue);
      // Assume we have deep cloned ideaCard to localIdeaCard
      this.localIdeaCard.rounds[roundIndex].ideas[ideaIndex].content = newValue;
      console.log(this.localIdeaCard.rounds[roundIndex].ideas[ideaIndex]);
      // Emit updated data to parent
      this.$emit("update:ideaCard", this.localIdeaCard);
    },
  },
};
</script>
