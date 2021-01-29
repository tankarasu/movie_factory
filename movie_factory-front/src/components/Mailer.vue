<template>
    <div>

    </div>
</template>

<script>
    import {SMTPClient} from 'smtp-client';
    export default{
      props: ["recipientEmail"],

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
          }
    });



          }
        }
      }

      methods:{

      }


        
    }
</script>