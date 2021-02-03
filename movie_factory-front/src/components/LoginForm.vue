<template>
  <div class="container-lg p-0 m-0 testLogin">
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
            <label
              class="form-control-label"
              :style="{ color: usernameColor }"
              >{{ labelUsername }}</label
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
          <!-- 3 spans reset forgot signup -->
          <div class="reset d-flex justify-content-center">
            <span class="btn  " @click="handleSignup()"> New account</span>
            <span
              type="button"
              class="btn "
              data-toggle="modal"
              data-target="#staticBackdrop"
            >
              Forgot password
            </span>
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
                <p v-if="signup">Le bouton vert Régis</p>
              </blockquote>
              <cite><span>-La cité de la peur-</span></cite>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="staticBackdrop"
      data-backdrop="static"
      tabindex="-1"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Forgot password
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body d-flex justify-content-center pb-0">
            <input
              class="pb-0 mb-0"
              type="text"
              v-model="forgotInput"
              placeholder="regis@mail.fr"
              required
            />
          </div>
          <div v-if="isForgot">
            <mailer-component
              :recipientEmail="this.recipientEmail"
            ></mailer-component>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-outline-danger"
              @click.prevent="handleForgot()"
              @keyup.enter="handleForgot()"
            >
              Send reset email
            </button>
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
import MailerComponent from "./Mailer.vue";

export default {
  components: { MailerComponent },
  name: "LoginForm",
  props: {},
  data() {
    return {
      isEmailEmpty: true,
      isEmailValid: false,
      isPasswordEmpty: true,
      isUsernameEmpty: true,
      forgot: false,
      reset: false,
      signup: false,
      username: "",
      email: "",
      isForgot: false,
      forgotInput: "",
      recipientEmail: "",
      newPassword: "",
      password: "",
      serveurMessage: "",
      labelEmail: "Email",
      emailColor: "#6c6c6c",
      usernameColor: "#6c6c6c",
      labelUsername: "",
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
    handleForgot() {
      this.isForgot = true;
      this.recipientEmail = this.forgotInput;
      this.forgotInput = "";
    },
    handleClick() {
      let log = this.login.getLoginURL;

      // email vide
      this.checkIsEmailEmpty(this.email);
      if (this.isEmailEmpty) return;

      // email non valide
      this.checkIsEmailValid(this.email);
      if (!this.isEmailValid) return;

      // password vide
      this.checkIsPasswordEmpty(this.password);
      if (this.isPasswordEmpty) return;

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

      // email vide
      this.checkIsEmailEmpty(this.email);
      if (this.isEmailEmpty) return;

      // email non valide
      this.checkIsEmailValid(this.email);
      if (!this.isEmailValid) return;
    },
    forgotPassword() {
      this.forgot = true;
      this.signup = false;
      this.reset = false;

      // email vide
      this.checkIsEmailEmpty(this.email);
      if (this.isEmailEmpty) return;

      // email non valide
      this.checkIsEmailValid(this.email);
      if (!this.isEmailValid) return;
    },
    handleSignup() {
      this.signup = true;
      this.reset = false;
      this.forgot = false;
    },
    signups() {
      // email vide
      this.checkIsEmailEmpty(this.email);
      if (this.isEmailEmpty) return;

      // email non valide
      this.checkIsEmailValid(this.email);
      if (!this.isEmailValid) return;

      // password vide
      this.checkIsPasswordEmpty(this.password);
      if (this.isPasswordEmpty) return;

      // check username empty
      this.checkIsUsernameEmpty(this.username);
      if (this.isUsernameEmpty) return;

      // action d'enrengistrer le User
      axios
        .post(`https://the-movie-factory-api.herokuapp.com/user/signup`, {
          email: this.email,
          password: this.password,
          username: this.username,
        })
        .then(async response => {
          let data = await response.data;
          if (data == "Email déja utilisé") {
            this.username = data + " Régis";
            setTimeout(() => {
              this.username = "";
              this.password = "";
              this.email = "";
              this.signup = false;
            }, 2000);
          } else {
            this.signup = false;
          }
        })
        .catch(err => console.log(err));
    },
    sendMail() {
      // email vide
      this.checkIsEmailEmpty(this.email);
      if (this.isEmailEmpty) return;

      // email non valide
      this.checkIsEmailValid(this.email);
      if (!this.isEmailValid) return;

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
    /**
     * Verification de la présence d'un email
     * @param {String} -- email de l'utilisateur entrée dans le input
     */
    checkIsEmailEmpty(email) {
      if (email.trim() === "") {
        this.emailColor = "red";
        this.labelEmail = "Veuillez renseigner une adresse email svp";
        setTimeout(() => {
          this.labelEmail = "Email";
          this.emailColor = "#6c6c6c";
          this.email = "";
        }, 2500);
      } else {
        this.isEmailEmpty = false;
      }
    },
    /**
     * Vérification de la validité de l'adress mail
     * @param {String} -- email de l'utilisateur entrée dans le input
     */
    checkIsEmailValid(email) {
      const mailRegex = new RegExp(
        "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$"
      );
      if (!mailRegex.test(email)) {
        this.emailColor = "red";
        this.labelEmail = "Veuillez renseigner une adresse email valide";
        setTimeout(() => {
          this.labelEmail = "Email";
          this.emailColor = "#6c6c6c";
          this.email = "";
        }, 2500);
      } else {
        this.isEmailValid = true;
      }
    },
    checkIsPasswordEmpty(password) {
      if (password.trim() === "") {
        this.passwordColor = "red";
        this.labelPassword = "Veuillez renseigner un mot de passe";
        setTimeout(() => {
          this.labelPassword = "Password";
          this.passwordColor = "#6c6c6c";
          password = "";
        }, 2500);
      } else {
        this.isPasswordEmpty = false;
      }
    },
    checkIsUsernameEmpty(username) {
      if (username.trim() === "") {
        this.usernameColor = "red";
        this.labelUsername = "Veuillez renseigner un pseudo";
        setTimeout(() => {
          this.labelUsername = "Username";
          this.usernameColor = "#6c6c6c";
          this.username = "";
        }, 2500);
      } else {
        this.isUsernameEmpty = false;
      }
    },
  },
};
</script>

<style scoped>
@import "./libs/Loginform.css";
</style>
