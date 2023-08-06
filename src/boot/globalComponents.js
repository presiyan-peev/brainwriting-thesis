// src/boot/globalComponents.js
import { boot } from "quasar/wrappers";
import AppInput from "src/components/forms/AppInput.vue";

export default boot(({ app }) => {
  app.component("AppInput", AppInput);
});
