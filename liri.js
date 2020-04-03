

require("dotenv").config();

// var axios = require("axios");
 var spotify = require("node-spotify-api");
// var moment = require("moment");
 var dotenv = require("dotenv");


var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var userInput = process.argv.slice(2).join(" ");

spotify.search({ type: 'track', query: userInput })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });

  // This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")