import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";

import "primevue/resources/themes/vela-orange/theme.css";
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

createApp(App)
  .use(router)
  .use(PrimeVue)
  .mount("#app");
