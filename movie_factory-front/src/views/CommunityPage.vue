<template>
  <div class="main">
    <navbar></navbar>
    <h2>
      Welcome {{ login.getLoggedUser.username.toUpperCase() }} inside the
      Community
    </h2>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import { mapState } from "vuex";

export default {
  name: "CommunityPage",
  components: { Navbar },
  computed: {
    // on importe le store et on le spread avec mapState
    ...mapState(["login"]),
  },
};
</script>

<style scoped>
@import './libs/Community.css';

</style>
