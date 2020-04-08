# liri-node-app

LIRI Bot is a CLI (command line interface) node app that returns data based on user input

To use this app:

1.  Type 'node' into the command line, note that this is considered index 0 on the command line
2.  Next, or at index 1, type the name of the js file, in this case 'liri.js'
3.  Next, or at index 2, type one of the following commands:
    a. concert-this
    b. spotify-this-song
    c. movie-this
    d. do-what-it-says

4. Lastly, at index 3, type either the name of an artist or band, song or movie accordingly.  If you typed
'do-what-it-says' on index 2, you will just hit enter without any any additional user input.

Pulling in data from the Spotify API, the BandsInTown API and the OMDB API, LiriBot will then bring up the relevant information based on your query and show that data not only in the 
terminal console, but also in a file that it will generate called log.txt.

* Please note: If you clone this repo for your own use, you will need to create your own .env file
and then install it as a dependency by including the following line in your .js file: var dotenv = require("dotenv")

Add the following to your .env file, replacing the values with your own spotify API ID and secret (no quotes) once you have them:

# Spotify API keys
SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

This file will be used by the dotenv package to set what are known as environment variables to the global process.env object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github — keeping your API key information private.