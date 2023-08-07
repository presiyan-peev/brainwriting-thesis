// src/boot/globalComponents.js
import { boot } from "quasar/wrappers";
import AppInput from "src/components/forms/AppInput.vue";
import AppTextarea from "src/components/forms/AppTextarea.vue";
import AppSlider from "src/components/forms/AppSlider.vue";
import AppDateTimePicker from "src/components/forms/AppDateTimePicker.vue";

export default boot(({ app }) => {
  app.component("AppInput", AppInput);
  app.component("AppTextarea", AppTextarea);
  app.component("AppSlider", AppSlider);
  app.component("AppDateTimePicker", AppDateTimePicker);
});
