# Operator Academy Project - Is Twilio Spamming Me?

## Spambot Scourge

Everyone's phone gets blown up with scammy calls and texts these days. While it's not 100% Twilio's fault, and Twilio does a lot to try and combat this type of use on their platform, bad actors and fraudsters will still try and find ways to use the power of Twilio to take advantage of people. 

## Cool Story Bro, What's the Plan?

This project attempts to help identify if a caller or texter is using a Twilio phone number by providing an express app that uses Twilio's Lookup API to take a provided number and responds with whether or not the number is a Twilio number. 

## How, exactly, does that help?

Well, it won't stop spammy calls and texts from originating, but you could hit this app to determine whether or not you want to answer a call, or if you wanted to validate that a texting party is really who they say they are. 

## Important Caveats

Twilio is a leader in the communications-platform-as-a-service (CPaaS) space, which means many companies use Twilio for legitimate purposes; i.e. a call or message may not be fraudulent just because it came from a Twilio number. Content and context are important inputs to the calculation.

## This app on its own doesn't seem incredibly useful

You're right; the real utility of this app will be when you it, or something like it, behind a Twilio number of your own. Put an app like this behind the incoming message request URL of an incoming Twilio phone number and then you can text numbers to it and get a response. 
