import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// config du dotenv
require("dotenv").config();
// importation des éléments pour bootstrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// cors
const cors = require("cors");
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Import du composant slider
import VueSplide from "@splidejs/vue-splide";

Vue.use(VueSplide);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
