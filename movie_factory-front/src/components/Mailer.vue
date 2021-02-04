<template>
    <div>
        <!-- v-if boolean sent true, message envoi mail ok. Else, msg pas ok -->
        <!-- TODO voir côté api pourquoi erreur rendu même si envoi Ok-->
        <span class="text-success" v-if="sent">Message sent to {{ recipientEmail }} !</br> Please check your inbox</span>
        <span class="text-danger" v-if="invalid">Invalid email syntax</span>
        <span class="text-danger" v-if="notfound">email not found</span>
        <span class="text-danger" v-if="failed">Sending failed</span>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MailerComponent",
  props: ["recipientEmail"],

      data(){
        return{
          sent: null,
          invalid: null,
          notfound: null,
          failed: null
        }
      },

      methods:{
        emailToReset(){
            axios
          .post("https://the-movie-factory-api.herokuapp.com/user/forgot", {
            recipientEmail: this.recipientEmail
          })
          .then((response) => {
            if (response.data=="success") {
              this.sent=true;
            }else if(response.data=="invalid"){
              this.invalid=true;
            }else if(response.data=="not found"){
              this.notfound=true;
            }else{
              console.log(response.data);
              this.failed=true;
            }

          })
          .catch((err) => console.log(err));
          }
        },
        created(){
          this.emailToReset();
          setTimeout(() => {
            this.error = "";
            this.sent = "";
          }, 5000);
          
        }
      }


</script>
