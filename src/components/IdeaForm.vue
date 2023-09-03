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
        <tr v-for="i in 6" :key="i">
          <td>{{ i }}</td>
          <td v-for="j in 3" :key="j">
            <q-input
              v-if="!round || round === i"
              v-model="texts[i][j]"
              type="textarea"
              rows="2"
              :disabled="round && round !== i"
            >
              <template v-if="round === i" #loading>
                <q-inner-loading>
                  <q-spinner />
                </q-inner-loading>
              </template>
            </q-input>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "IdeaForm",
  props: {
    round: {
      type: [Number, undefined],
      validator(value) {
        return !value || (value >= 1 && value <= 6);
      },
    },
  },
  data() {
    return {
      texts: Array(7)
        .fill()
        .map(() => Array(7).fill("")),
    };
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

td,
th {
  border: 1px solid black;
  padding: 10px;
  text-align: center;
}

q-input {
  height: auto; /* adjust as needed */
  overflow: hidden;
}
</style>
