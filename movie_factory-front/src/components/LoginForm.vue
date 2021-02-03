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
          <!--           <span id="messageServeur" class="text-warning">{{
            serveurMessage
          }}</span> -->
          <!-- 3 spans reset forgot signup -->
          <div class="reset d-flex justify-content-center">
            <!-- <span @click="forgotPassword()">forgot </span>|<span
              @click="resetPassword()"
            >
              reset </span
            >| --><span class="btn" @click="handleSignup()"> New account</span>
            <button
              type="button"
              class="btn"
              data-toggle="modal"
              data-target="#staticBackdrop"
            >
              Forgot password
            </button>
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
            <!--             <button
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
            </button> -->
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
      // username vide
      // email existe déja
      // password vide
      this.checkIsPasswordEmpty(this.password);
      if (this.isPasswordEmpty) return;

      axios

        .post(`https://the-movie-factory-api.herokuapp.com/user/signup`, {
          email: this.email,
          password: this.password,
          username: this.username,
        })
        .then(response => {
          if (response.data == "email déja utilisé") {
            this.username = response.data + " Régis";
            setTimeout(() => (this.username = ""), 2000);
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
  },
};
</script>

<style scoped>
@import "./libs/Loginform.css";
</style>
