const express = require("express");
const router = express.Router();

// Axios allows us to make HTTP requests from our app
const axios = require("axios").default;

require('dotenv').config()
const api_key = process.env.TWILIO_ACCOUNT_SID
const api_token = process.env.TWILIO_AUTH_TOKEN

// Handle a GET request to the root directory, and send "Hello World" as a response
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
        username: api_key,
        password: api_token
      }
    })
    // here `response` is the response we get from the API,
    // Not to be confused with `res`, which is the response for our own app.
    .then((response) => {
      // The response will have headers and a body. We get the body using `data`.
      if (response.status >= 200 && response.status < 300) {
        let carrier = response.data.carrier.name;
        // The response will have headers and a body. We get the body using `data`.
        if (carrier == "*Twilio*") {
            console.log(`Oh snap! ${phonenumber} is totes a Twilio number!`);
            res.send(`Oh snap! ${phonenumber} is totes a Twilio number!`);
          } else {
            console.log(`${phonenumber} is not a Twilio number, but it still sucks that you are getting spammed!`);
            res.send(`${phonenumber} is not a Twilio number, but it still sucks that you are getting spammed!`);
          }
      } else {
        console.log(`Error: ${response.status} - ${response.statusText}`);
        res.send(`Error: ${response.status} - ${response.statusText}`);
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        console.log("Does not look like a real phone number");
        res.send("Does not look like a real phone number");
      } else if (error.response && error.response.status === 401) {
        console.log("Invalid API credentials");
        res.send("Invalid API credentials");
      } else {
        console.log("Oh shit: ");
        console.log(error);
        res.send("Oh shit an error occurred!");
      }
    });
});
module.exports = router;
