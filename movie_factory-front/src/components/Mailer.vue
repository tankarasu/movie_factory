<template>
    <div>
        <!-- v-if boolean sent true, message envoi mail ok. Else, msg pas ok -->
        <!-- TODO voir côté api pourquoi erreur rendu même si envoi Ok-->
        <span class="text-success" v-if="sent">Message sent to {{ recipientEmail }} !</br> Please check your inbox</span>
        <span class="text-danger" v-if="error">An error occured</span>
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
          error: null,
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
            }else if(response.data=="invalid"||response.data=="not found"||response.data=="failed"){
              this.error=true;
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
