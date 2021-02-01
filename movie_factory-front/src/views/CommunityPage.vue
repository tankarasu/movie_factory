<template>
  <div class="main row">
    <navbar></navbar>
    <h2 class="col-12">
      Welcome {{ login.getLoggedUser.username.toUpperCase() }} inside the
      Community
    </h2>
    <div class="row m-0">
      <profil-component
        v-for="(user, index) in getAllUser"
        class="users m-4"
        :key="index"
        :name="user.username"
        :favoriteCount="user.favorite"
        :seen="user.seen"
        @click="handleUserProfil()"
      ></profil-component>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import { mapState } from "vuex";
import ProfilComponent from "../components/ProfilComponent.vue";

export default {
  name: "CommunityPage",
  components: { Navbar, ProfilComponent },
  computed: {
    // on importe le store et on le spread avec mapState
    ...mapState(["login", "getAllUser"]),
  },
  methods: {
    handleUserProfil() {
    },
  },
};
</script>

<style scoped>
@import "./libs/Community.css";
.users {
  border: 1px solid #6c6c6c;
}

.main {
  height: 80vh;
}
</style>
