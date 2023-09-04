<template>
  <h6>{{ label }}: {{ timeLeft }}</h6>
</template>

<script>
export default {
  props: {
    timestamp: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      default: "Time remaining",
    },
  },
  data() {
    return {
      interval: null,
      timeLeft: "",
    };
  },
  computed: {
    endTime() {
      return new Date(this.timestamp);
    },
  },
  methods: {
    updateTime() {
      const now = new Date();
      const distance = this.endTime - now;

      if (distance <= 0) {
        clearInterval(this.interval);
        this.timeLeft = "Event has started!";
        return;
      }

      const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor(
        (distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.timeLeft = `${months > 0 ? months + " month, " : ""}${
        days > 0 ? days + " days, " : ""
      }${hours > 0 ? hours + " hours, " : ""}${
        minutes > 0 ? minutes + " minutes, " : ""
      }${seconds > 0 ? seconds + " seconds" : ""}`;
    },
  },
  mounted() {
    this.updateTime();
    this.interval = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
/* Add any styling you wish here */
</style>
