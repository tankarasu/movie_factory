<template>
    <div class="container">
      <div class="LoginForm login-box">
        <div class="loginHeader">
          <img src="../assets/the-movie-factory.png" alt="logo" class="logo" />
        </div>
        <div class="login">
          <form action="" v-if="!used">
            <div>
                <label class="form-control-label" style="font-size: 1.4em; padding-top: 1em;"
                :style="{ color: inputColor }">{{ title }}</label>
            </div>
            <div class="form-group log">
                <label
                class="form-control-label"
                :style="{ color: inputColor }"
                > New password</label
              >
              <input type="password" class="form-control" v-model="newPassword" />
              <label
                class="form-control-label"
                :style="{ color: inputColor }"
                >Confirm password</label
              >
              <input type="password" class="form-control" v-model="passwordConfirm" />
            </div>

            <button
            type="submit"
            class="btn btn-outline-danger"
            @click.prevent="handleClick()"
            @keyup.enter="handleClick()"
            >
            Apply
            </button>
          </form>
          <div v-if="used">
            <p class="form-control-label"style="font-size: 1.4em; padding-top: 1em;">Password changed</p>
            <button
            class="btn btn-outline-success"
            ><a class="text-dark text-decoration-none" href="http://localhost:3051">Take me home</a>
            </button>
          </div>
        </div>
        <div class="loginFooter">
          <!-- info récup MDP -->
          <div class="testimonial-quote right">
            <div class="quote-container">
              <div>
                <blockquote>
                  <p>Le bouton rouge Régis</p>
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

    export default {
      //name: "ResetForm",
      data() {
          return {
          isPasswordEmpty: true,
          newPassword: "",
          passwordConfirm:"",
          mismatch: true,
          title: "Reset password",
          inputColor: "#6c6c6C",
          used: false,
          };
      },

      methods: {

          handleClick() {
            this.checkIsPasswordEmpty(this.newPassword);
            if (this.isPasswordEmpty) return;
            this.passwordsMatch(this.newPassword, this.passwordConfirm);
            if (this.mismatch) return;
            console.log("Dans handleclick");
            axios
            .post("http://localhost:3050/user/update-user", {
              email: this.$route.params.email,
              password: this.newPassword
            })
            .then((response) => {
              console.log(response.data);
              if (response.data=="success") {
                this.used=true;
              }else if(response.data=="invalid"||response.data=="not found"||response.data=="failed"){
                //TODO gérer problème d'update password
                this.used=false;
              } 
            })
            .catch((err) => {
              console.log(err)
              //TODO gérer problème d'update password
              this.used=false;
            });
          },

          declinePassword(title) {
          this.inputColor = "#d64541";
          this.title = title;
          setTimeout(() => {
              this.title = "Reset password";
              this.inputColor = "#6c6c6c";
              this.newPassword = "";
              this.confirmPassword = "";
          }, 2500);
          return;
          },
          
          checkIsPasswordEmpty(password) {
            if (password.trim() === "") {
                this.declinePassword("Please type a password");
                this.isPasswordEmpty = true;
            } else {
                this.isPasswordEmpty = false;
            }
          },

          passwordsMatch(newPassword, passwordConfirm){
            if(newPassword==passwordConfirm){
                this.mismatch = false;
            }else{
                this.declinePassword("Passwords don't match")
                this.mismatch = true;
            }
          },

      },
    };
    </script>