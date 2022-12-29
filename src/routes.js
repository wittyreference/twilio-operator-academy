const express = require("express");
const router = express.Router();

// Axios allows us to make HTTP requests from our app
const axios = require("axios").default;

// Handle a GET request to the root directory,
// and send "Hello World" as a response
router.get("/", (req, res) => {
  res.send("Hello World!");
});

//Is Twilio Spamming Me? bot 

router.get("/twilioSpam/:phonenumber", (req, res) => {
  let phonenumber = req.params.phonenumber;

  // Use Axios to make a GET request to the Twilio Lookup API
  axios
    .get(`https://lookups.twilio.com/v1/PhoneNumbers/${phonenumber}?Type=carrier`, {
      auth: {
        username: TWILIO_ACCOUNT_SID,
        password: TWILIO_AUTH_TOKEN
      }
    })
    // here `response` is the response we get from the API,
    // Not to be confused with `res`, which is the response for our own app.
    .then((response) => {
      // The response will have headers and a body. We get the body using `data`.
      let carrier = response.data.carrier.name;
      // Now we can use the response from the  API to build our own response.
      if (carrier === "Twilio") {
        res.send(
          console.log(
            `Oh snap! ${phonenumber} is totes a Twilio number!`
            );
        );
      } else {
        res.send(
          console.log(
            `${phonenumber} is not a Twilio number, but it still sucks that you are getting spammed!`
            );
        );
      }
    })
    .catch((error) => {
      console.log('Oh shit: ');
      console.log(error);
      
    });

});

module.exports = router;
