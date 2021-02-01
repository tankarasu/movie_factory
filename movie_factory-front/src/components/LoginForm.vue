<template>
  <div class="container">
    <div class="LoginForm login-box">
      <div class="loginHeader">
        <img src="../assets/the-movie-factory.png" alt="logo" class="logo" />
      </div>
      <div class="login">
        <form action="">
          <!-- login adressMail -->
          <div class="form-group log">
            <!-- EMAIL -->
            <label class="form-control-label" :style="{ color: emailColor }">{{
              labelEmail
            }}</label>
            <input type="text" class="form-control" v-model="email" />
          </div>
          <!-- PASSWORD -->
          <div class="form-group log" v-if="!forgot">
            <label
              class="form-control-label"
              :style="{ color: passwordColor }"
              >{{ labelPassword }}</label
            >
            <input type="password" class="form-control" v-model="password" />
          </div>
          <!-- USERNAME - PSEUDO -->
          <div class="form-group log" v-if="signup">
            <label class="form-control-label" :style="{ color: passwordColor }"
              >username</label
            >
            <input type="text" class="form-control" v-model="username" />
          </div>
          <!-- New Password -->
          <div class="form-group log" v-if="!forgot & reset">
            <label class="form-control-label" :style="{ color: passwordColor }"
              >new {{ labelPassword }}</label
            >
            <input type="password" class="form-control" v-model="newPassword" />
          </div>
          <!-- MESSAGE SERVEUR BROWSER -->
          <span id="messageServeur" class="text-warning">{{
            serveurMessage
          }}</span>
          <!-- 3 spans reset forgot signup -->
          <div class="reset">
            <span @click="forgotPassword()">forgot </span>|<span
              @click="resetPassword()"
            >
              reset </span
            >|<span @click="handleSignup()"> sign up</span>
          </div>

          <!-- affichage conditionnel des boutons -->
          <div class="boutons">
            <!-- prevent previent le rechargement -->
            <button
              v-if="!reset && !signup && !forgot"
              type="submit"
              class="btn btn-outline-danger"
              @click.prevent="handleClick()"
              @keyup.enter="handleClick()"
            >
              Login
            </button>
            <button
              v-if="forgot | signup | reset"
              type="submit"
              class="btn btn-outline-secondary"
              @click.prevent="handleCancel()"
              @keyup.enter="handleCancel()"
            >
              Cancel
            </button>
            <button
              v-if="forgot"
              type="submit"
              class="btn btn-outline-info"
              @click.prevent="sendMail()"
              @keyup.enter="sendMail()"
            >
              Send
            </button>
            <button
              v-if="reset"
              type="submit"
              class="btn btn-outline-warning"
              @click.prevent="handleClick()"
              @keyup.enter="handleClick()"
            >
              Reset
            </button>
            <button
              v-if="signup"
              type="submit"
              class="btn btn-outline-success"
              @click.prevent="signups()"
              @keyup.enter="signups()"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div class="loginFooter">
        <!-- info récup MDP -->
        <div class="testimonial-quote right">
          <div class="quote-container">
            <div>
              <blockquote>
                <p v-if="!forgot && !reset && !signup">Le bouton rouge Régis</p>
                <p v-if="forgot">Le bouton bleu Régis</p>
                <p v-if="reset">Le bouton jaune Régis</p>
                <p v-if="signup">Le bouton vert Régis</p>
              </blockquote>
              <cite><span>-La cité de la peur-</span></cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

// import de la methode qui nous donnera le store
import { mapState } from "vuex";

import LoginVue from "../views/Login.vue";

export default {
  name: "LoginForm",
  props: {},
  data() {
    return {
      forgot: false,
      reset: false,
      signup: false,
      username: "",
      email: "",
      newPassword: "",
      password: "",
      serveurMessage: "",
      labelEmail: "Email",
      emailColor: "#6c6c6c",
      labelPassword: "Password",
      passwordColor: "#6c6c6C",
    };
  },
  computed: {
    // on importe le store et on le spread avec mapState
    ...mapState(["login"]),
  },
  // regroupe les methodes du composants
  methods: {
    handleTest() {
      this.$store.dispatch("fetchUser", {
        email: this.email,
        password: this.password,
        router: this.$router,
      });
    },
    handleClick() {
      // TODO modulariser si possible
      let log = this.login.getLoginURL;
      // gestion des erreurs
      const mailRegex = new RegExp(
        "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$"
      );

      // email vide
      if (this.email.trim() === "") {
        this.emailColor = "red";
        this.labelEmail = "Veuillez renseigner une adresse email";
        setTimeout(() => {
          this.labelEmail = "Email";
          this.emailColor = "#6c6c6c";
          this.email = "";
        }, 2500);
        return;
      }

      // email non valide
      if (!mailRegex.test(this.email)) {
        this.emailColor = "red";
        this.labelEmail = "Veuillez renseigner une adresse email valide";
        setTimeout(() => {
          this.labelEmail = "Email";
          this.emailColor = "#6c6c6c";
          this.email = "";
        }, 2500);
        return;
      }
      // password vide
      if (this.password.trim() === "") {
        this.passwordColor = "red";
        this.labelPassword = "Veuillez renseigner un mot de passe";
        setTimeout(() => {
          this.labelPassword = "Password";
          this.passwordColor = "#6c6c6c";
          this.password = "";
        }, 2500);
        return;
      }
      // le store gère le password
      this.$store.dispatch("fetchUser", {
        email: this.email,
        password: this.password,
        router: this.$router,
      });
    },
    resetPassword() {
      this.reset = true;
      this.forgot = false;
      this.signup = false;
    },
    forgotPassword() {
      this.forgot = true;
      this.signup = false;
      this.reset = false;
    },
    handleSignup() {
      this.signup = true;
      this.reset = false;
      this.forgot = false;
    },
    signups() {
      axios
        .post("http://localhost:3050/user/signup", {
          email: this.email,
          password: this.password,
          username: this.username,
        })
        .then((response) => {
          if (response.data == "email déja utilisé") {
            this.username = response.data + " Régis";
            setTimeout(() => (this.username = ""), 2000);
          }
        })
        .catch((err) => console.log(err));
    },
    sendMail() {
      this.serveurMessage = "Un email de réinitialisation vient d'être envoyé";
      setTimeout(() => {
        this.serveurMessage = "";
        this.signup = false;
        this.reset = false;
        this.forgot = false;
      }, 2000);
    },
    handleCancel() {
      this.signup = false;
      this.reset = false;
      this.forgot = false;
    },
    declinePassword() {
      this.passwordColor = "red";
      this.labelPassword = "Mot de passe incorrect";
      setTimeout(() => {
        this.labelPassword = "Password";
        this.passwordColor = "#6c6c6c";
        this.password = "";
      }, 2500);
      return;
    },
  },
};
</script>

<style scoped>
@import './libs/Loginform.css';

</style>
