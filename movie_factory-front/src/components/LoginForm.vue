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
.logo {
  width: 100%;
}

.login-box {
  width: 450px;
  position: relative;
  left: 50%;
  transform: translateX(-225px);
  margin-top: 75px;
  height: auto;
  background: #111416ea;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.login-title {
  margin-top: 15px;
  text-align: center;
  font-size: 30px;
  letter-spacing: 2px;
  margin-top: 15px;
  font-weight: bold;
  color: #ecf0f5;
}

.loginHeader img {
  margin-top: 2rem;
}

.login-form {
  margin-top: 25px;
  text-align: left;
}

.log {
  display: flex;
  margin-top: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input[type="text"] {
  width: 75%;
  background-color: #111416ea;
  border: none;
  border-bottom: 2px solid #ecf0f5;
  border-top: 0px;
  border-radius: 0px;
  font-weight: bold;
  outline: 0;
  margin-bottom: 20px;
  padding-left: 0px;
  color: #ecf0f5;
  text-align: center;
}

input[type="password"] {
  width: 75%;
  background-color: #111416ea;
  border: none;
  border-bottom: 2px solid #ecf0f5;
  border-top: 0px;
  border-radius: 0px;
  font-weight: bold;
  outline: 0;
  padding-left: 0px;
  margin-bottom: 20px;
  color: #ecf0f5;
  text-align: center;
}

.form-group {
  margin-bottom: 40px;
  outline: 0px;
}

.form-control:focus {
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 2px solid #0db8de;
  outline: 0;
  background-color: #1a2226;
  color: #ecf0f5;
}

input:focus {
  outline: none;
  box-shadow: 0 0 0;
}

label {
  margin-bottom: 0px;
}

.form-control-label {
  font-size: 1rem;
  color: #6c6c6c;
  font-weight: bold;
  letter-spacing: 1px;
}

.btn-outline-primary {
  border-color: #0db8de;
  color: #0db8de;
  border-radius: 0px;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.btn-outline-primary:hover {
  background-color: #0db8de;
  right: 0px;
}

.testimonial-quote {
  font-size: 16px;
}

.testimonial-quote blockquote {
  /* Negate theme styles */
  border: 0;
  margin: 0;
  padding: 0;

  background: none;
  color: gray;
  font-family: Georgia, serif;
  font-size: 1.5em;
  font-style: italic;
  line-height: 1.4 !important;
  margin: 0;
  position: relative;
  text-shadow: 0 1px white;
  z-index: 600;
}

blockquote {
  text-align: right;
}

.testimonial-quote blockquote * {
  box-sizing: border-box;
}

.testimonial-quote blockquote p {
  color: #75808a;
  line-height: 1.4 !important;
}

.testimonial-quote blockquote p:first-child:before {
  content: "\201C";
  color: #81bedb;
  font-size: 5.5em;
  font-weight: 700;
  opacity: 0.3;
  position: absolute;
  top: -0.4em;
  left: 0.05em;
  text-shadow: none;
  z-index: -300;
}

.testimonial-quote cite {
  color: gray;
  display: block;
  font-size: 0.8em;
}

.testimonial-quote cite span {
  color: #5e5e5e;
  font-size: 1em;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 0 1px white;
}

.testimonial-quote {
  position: relative;
  left: 20px;
  padding: 2rem 0 1rem 0;
}

.testimonial-quote .quote-container {
  padding-left: 100px;
}

.testimonial-quote.right .quote-container {
  padding-left: 0;
  padding-right: 150px;
}

.testimonial-quote.right cite {
  text-align: right;
}

.reset {
  color: #6c6c6c;
  margin-bottom: 1rem;
}

.reset span:hover {
  color: #ecf0f5;
}

.boutons {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
