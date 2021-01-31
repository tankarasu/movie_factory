<template>
  <div class="main">
    <navbar></navbar>
    <h2>
      Welcome {{ login.getLoggedUser.username.toUpperCase() }} on your Profil
      Page
    </h2>
    <profil-component :name="login.getLoggedUser.username"></profil-component>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProfilComponent from "../components/ProfilComponent.vue";
import Navbar from "./Navbar.vue";

export default {
  name: "ProfilPage",
  components: { Navbar, ProfilComponent },
  computed: {
    ...mapState(["login"]),
  },
};
</script>

<style scoped>
h2 {
  background: #111416ea;
  color: aliceblue;
}
</style>
