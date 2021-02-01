<template>
    <div>
      <!-- v-if boolean sent true, message envoi mail ok. Else, msg pas ok -->
      <span class="text-success" v-if="sent">Message sent to {{ recipientEmail }} ! Please check your inbox</span>
      <span class="text-danger" v-else="!sent">An error occured</span>
    </div>
</template>

<script>
    //import 'setimmediate';*
    import axios from "axios";
    export default {
      
      name: "MailerComponent",
      components: {},
      props: ["recipientEmail"],

      data(){
        return{
          sent:false, // sent à récupérer dans réponse requête axios
        }
      },
      
      methods:{
          postEmailToReset(){
            axios
          .post("http://localhost:3050/user/forgot", {
            recipientEmail: this.recipientEmail 
          })
          .then((response) => {
            if (response.data == "false") {
              this.sent=true;
            }
          })
          .catch((err) => console.log(err));
          }
        },

        created() {
          console.log(this.recipientEmail);
          
          this.postEmailToReset();
        }


      }
</script>