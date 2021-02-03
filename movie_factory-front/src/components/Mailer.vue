<template>
    <div>
        <!-- v-if boolean sent true, message envoi mail ok. Else, msg pas ok -->
        <!-- TODO voir côté api pourquoi erreur rendu même si envoi Ok-->
        <div>	{{ recipientEmail }} </div>
        <span class="text-success" v-if="sent">Message sent to {{ recipientEmail }} ! Please check your inbox</span>
        <span class="text-danger" v-else>An error occured</span>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
      name: "MailerComponent",
      props: ["recipientEmail"],

      data(){
        return{
          sent:false,
        }
      },

      methods:{
        emailToReset(){
            axios
          .post("https://the-movie-factory-api.herokuapp.com/user/forgot", {
            recipientEmail: this.recipientEmail
          })
          .then((response) => {
            if (response.data) {
              this.sent=true;
            }
            console.log("Front: Réponse recue: "+response.data);
          })
          .catch((err) => console.log("Front: Catch: "+err));
          }
        },
        created(){
          this.emailToReset();
        }
      }


</script>