import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { formValidation } from "./plugins/formValidation";

import "./assets/main.css";

const app = createApp(App);
app.use(formValidation);

app.use(router);

app.mount("#app");
