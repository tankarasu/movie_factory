<template>
    <div>
      <!-- if v-if boolean sent true, message envoi mail ok -->
      <span class="text-success" v-if="sent">Message sent! Please check your inbox</span>
    </div>
</template>

<script>
    export default{
      name: "MailerComponent",
      props: ["recipientEmail"],

      data:{
        sent:"false",
      },

      methods:{
        sendMail(){
          const {smtpEmail,smtpPassword,oAuthID,oAuthSecret,refreshToken } = process.env;
          //Création d'un objet transporter
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: smtpEmail,
              pass: smtpPassword,
              clientId: oAuthID,
              clientSecret: oAuthSecret,
              refreshToken: refreshToken
            }
          });  
            let mailOptions = {
            from: "tmfresetservice@gmail.com",
            to: recipientEmail,
            subject: 'Nodemailer Project',
            text: 'Hi from your nodemailer project'
          };
          transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
              console.log("Error " + err);
            } else {
              console.log("Email sent successfully");
              sent=true;
            }
          });

          }
        }
      }
</script>