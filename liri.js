
// At the top of the liri.js file, add code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");

// With Axios, liriBot will import data from the bands-in-town api and the omdb api
var axios = require("axios"); 

var Spotify = require("node-spotify-api");

// Moment will be used to make the date of the concert (data returned from bands-in-town) look better
var moment = require("moment");
// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
var dotenv = require("dotenv");
// The fs module provides an API for interacting with the file system 
var fs = require("fs");

// Variables for the arguments to be entered by the user
var request = process.argv[2];

// Using the slice method, create a variable for the userInput to handle entries containing more than one word 
var userInput = process.argv.slice(3).join(" ");

//  Make it so liri.js can take in one of the following commands: concert-this, spotify-this-song, 
//  movie-this or do-what-it-says

// This Switch Statement executes the code depending on the request (on index line 2) that the user enters
function liriBot(request, userInput) {
  switch (request) {
    case "concert-this":
      getBandsInTown(userInput);
    break;

    case "spotify-this-song":
      getSpotify(userInput);
    break;

    case "movie-this":
      getOMDB(userInput);
    break;

    case "do-what-it-says":
    // This function (see line 154) will reference the random.txt doc and follow the command within
      getRandom();
    break;

    // Returns a default message if the request line (index 2) is left blank
    default:
      console.log("Please enter a request such as 'concert-this', 'spotify-this-song', or 'movie-this'");
  };
};

//----------------------- FUNCTION TO SEARCH THE SPOTIFY API ----------------------------
function getSpotify(songName) {

  //Variable for the Key & Secret for Spotify
  var spotify = new Spotify(keys.spotify);

    // If the user does not enter a song name or the song name is not found use "The Sign"
    if(!songName) {
      songName = "The Sign";
    };

  spotify.search({type: 'track', query: songName}, function (err, data) {
    if(err) {
      return console.log('Error occurred: ' + err);
    };
    
    // adding a line break for clarity of when search results begin
    console.log("\r\n" + "===============================" + "\r\n");
    // returns Artist(s)
    console.log("Artist(s) Name: " + data.tracks.items[0].album.artists[0].name + "\r\n");
    // returns the Song's name
    console.log("Song Name: " + data.tracks.items[0].name + "\r\n");
    // returns a preview link of the song from Spotify
    console.log("Song Preview Link: " + data.tracks.items[0].href + "\r\n");
    // returns the name of the Album that the song is from
    console.log("Album: " + data.tracks.items[0].album.name + "\r\n");
    // adding a line break for clarity of when search results end
    console.log("===============================" + "\r\n");

    // Appends text into log.txt file 
    var logSong = "\r\n" + "===== Begin spotify-this-song log entry =====" + "\r\n" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\r\n" + "\nSong Name: " + data.tracks.items[0].name + "\r\n" +  "\nSong Preview Link: " + data.tracks.items[0].href + "\r\n" +  "\nAlbum: " + data.tracks.items[0].album.name + "\r\n" + "\n===== End spotify-this-song log entry =====" + "\r\n";

    fs.appendFile("log.txt", logSong, function(err) {
      if (err) throw err;
    });

  });
};

//----------------------- FUNCTION TO SEARCH BANDS IN TOWN API VIA AXIOS ----------------------------

function getBandsInTown(artist) {

  var artist = userInput;
  var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(bandQueryURL).then(
    function (response) {
      // adding a line break for clarity of when search results begin
      console.log("\r\n" + "===============================" + "\r\n");
      console.log("Name of the venue: " + response.data[0].venue.name + "\r\n");
      console.log ("Venue Location: " + response.data[0].venue.city + "\r\n");
      console.log("Date of the event: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\r\n");
      // adding a line break for clarity of when search results end
      console.log("===============================" + "\r\n");

      //Append text into log.txt file
      var logConcert = "\n============ Begin concert-this log entry ===========" + "\r\n" + "\nName of the musician: " + artist + "\r\n" + "\nName of the venue: " + response.data[0].venue.name +  "\r\n" + "\nDate of the event: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\r\n" + "\n============ End concert-this log entry ============" + "\r\n";

      fs.appendFile("log.txt", logConcert, function (err) {
        if (err) throw err;
      });
    });
};

//----------------------- FUNCTION TO SEARCH THE OMDB API VIA AXIOS ----------------------------

function getOMDB(movie) {
  //If the user doesn't type a movie in, the program will output data for the movie "Mr. Nobody"
  if (!movie) {
    movie = "Mr. Nobody";
  }
  var movieQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=shor&apikey=trilogy";

  axios.request(movieQueryUrl).then(
    function (response) {
      // adding a line break for clarity of when search results begin
      console.log("\r\n" + "===============================" + "\r\n");
      console.log("Title: " + response.data.Title + "\r\n");
      console.log("Year Released: " + response.data.Year + "\r\n");
      console.log("IMDB Rating: " + response.data.imdbRating + "\r\n");
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r\n");
      console.log("Country Where Produced: " + response.data.Country + "\r\n");
      console.log("Language: " + response.data.Language + "\r\n");
      console.log("Plot: " + response.data.Plot + "\r\n");
      console.log("Actors: " + response.data.Actors + "\r\n");
      console.log("===============================" + "\r\n");

      // logResults(response);
      var logMovie = "\r\n" + "========== Begin movie-this log entry =======" + "\r\n" + "\nMovie title: " + response.data.Title + "\nYear released: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry Where Produced: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\r\n" + "\n========== End movie-this log entry =======" + "\r\n";

      fs.appendFile("log.txt", logMovie, function (err) {
        if (err) throw err;
    });
});
};

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands

function getRandom() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    } else {
      console.log(data);

      var randomData = data.split(",");
      liriBot(randomData[0], randomData[1]);
    }
  });
};

// Function to log results from the other functions
function logResults(data) {
  fs.appendFile("log.txt", data, function (err) {
    if(err) throw err;
  });
};

liriBot(request, userInput)