// import nécessaire pour le fonctionnement
import Vue from "vue";
import VueRouter from "vue-router";
// import module pour les rendus de liens
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Film from "../views/Film.vue"

Vue.use(VueRouter);

const routes = [
  {
    // landing page of the application
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/film",
    name: "Film",
    component:Film
  },
  // redirection si URL ne correspond à aucune citée
  {
    path: "/*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
