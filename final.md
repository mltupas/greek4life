# Team Name: 
___Greek 4 Life___

# Team Members Contributions

*Paragraph or bullet points briefly describing all of their contributions to your team's project. What did each team member contribute throughout the quarter?*

___Allston Fojas___
* Wrote the backend code in each of the JS pages for each respective HTML page to access the Spotify API's endpoints and Firebase to update the realtime database
* Wrote the server code to access and use the relevant Spotify API endpoints, such as playing and pausing a song, getting a song's audio features, and getting a list of song recommendations based on certain search parameters
* Wrote the code to gain access to Firebase and use it instead of LocalStorage
* Helped combine frontend code with backend code to get our app to work and meet the requirements for each milestone

___Mark Tupas___ 
* Wrote backend code for JS files, including AJAX calls to Spotify's API and displaying returned information to frontend
* Wrote code for web app features such as the on-hover feature on album art, dual-column song display, and localStorage function (subsequently replaced with Firebase) to display saved songs
* Facilitated ease of use of web app by restructuring page layout, creating auto-popup menus (when first entering search_by_bpm.html), and providing visual cues to user (asterisks to denote required fields).

___Raul Garza___
* ...

___Cole Richmond___
* ...

# Source Code Files

*List of all source code files in your GitHub project repository that your team members wrote, along with a brief description of what functionality is implemented in each file. This should include all HTML, CSS, JavaScript, and other relevant code files that you wrote.*

final

> static_files

>> css

>>> search_pages.css

* This file contains the CSS code to standardize the text font and size, color scheme, and layout of the search pages. That way, we have the Go to Home Page button in the top left corner, playback functionality under the Go to Home Page button, Saved Music icon in the top right corner, list of songs such that the display is the following from left to right: remove icon, album art, song name and artist name, and play and save icons. In addition, when the user plays a song, the background of that song turns to green, which indicates to the user that the current song is playing. 

>>> style.css

* This file contains the CSS code to standardize the text font and size, color scheme, and layout of the index page. That way, we have the Saved Music icon in the top left corner, app logo in the center with the introductory text, and the vinyl records icons that act as buttons to search by either a BPM value or a song title to receive a list of song recommendations. 

>> js

>>> client_saved_music.js

* This file contains the Spotify API and Firebase credentials to have our application access Spotify to play music, and display the saved music, and access Firebase to access saved songs, and other settings in their realtime database.

>>> client_search_by_bpm.js

* This file contains the Spotify API and Firebase credentials to have our application access Spotify to play music, get a list of genres, get a list of song recommendations, and display the recommendations, and access Firebase to save songs, current song recommendations, and other settings in their realtime database.

>>> client_search_by_song.js

* This file contains the Spotify API and Firebase credentials to have our application access Spotify to play music, search for recommendations based on a song title, get a list of song recommendations, and display the recommendations, and access Firebase to save songs, current song recommendations, and other settings in their realtime database.

>> index.html

* This is the home page for our application. From this page, the user can decide to do one of three things: see their saved songs from prior interactions with the application, choose to search for new songs by their tempo (measured in beats per mimute), or choose to search for new songs that share similar a similar tempo with the song that was searched for. Additionally, this file contains the images of our logo, an image of a DJ and images of vinyl records to stay consistent with our target audience of DJs. In addition, the vinyl records act as buttons to search by either a BPM value or a song title to receive a list of song recommendations for DJs to use for their next mix/playlist. Finally, there is a reference to the Firebase JS SDK so our application uses the realtime database offered by Firebase.

>> saved_music.html

* This page is where users are able to store their favorite songs to be used later. Additionally, users are able to play their saved songs using the playback setting from the Spotify API as well as remove songs from their list of saved songs. Furthermore, this file contains the function to display a user's list of saved songs that the DJ could use for their next mix/playlist. We get playback functionality and other useful functions by using the Spotify API, which is referenced in the <head>. This file includes a Go to Home Page button, playback functionality, and a display of the user's list of saved songs. The user can see each song's important audio features and play the song to help them create their next mix/playlist.

>> search_by_bpm.html

* This file contains the function to search by a BPM value to receive a list of song recommendations for DJs to use for their next mix/playlist. We get song recommendations and other useful functions by using the Spotify API, which is referenced in the <head>. This file includes a Go to Home Page button, a modal to select up to 5 genres, playback functionality, a text box to input a BPM value, a Search button, a Saved Songs button, and some descriptive text to inform the user on how to navigate this page. Additionally, when the user clicks Search, the list of song recommendations get displayed, where the user can see each song's important audio features, play the song, and save the song to their saved songs.

>> search_by_song.html

* This file contains the function to search by a song title to receive a list of song recommendations for DJs to use for their next mix/playlist. We get song recommendations and other useful functions by using the Spotify API, which is referenced in the <head>. This file includes a Go to Home Page button, playback functionality, a text box to input a song title, a Search button, a Saved Songs button, and some descriptive text to inform the user on how to navigate this page. Additionally, when the user clicks Search, the list of song recommendations get displayed, where the user can see each song's important audio features, play the song, and save the song to their saved songs.

> server.js

* Specifically, this file contains certain frameworks and libraries, such as express, request, and querystring, that help accessing certain Spotify API endpoints. In addition, this file contains the GET and POST requests to relevant Spotify API endpoints, such as getting song recommendations, playing and pausing a song, and getting a song's audio features, that makes our application work. This file also contains the call to open our application on localhost:3000.

# Presentation Slide

https://docs.google.com/presentation/d/1grHH8VHdZIFrviFxI0kQxHAs-roQo7u2T-Za-w8myBU/edit?usp=sharing

# Demo Video

[INSERT LINK HERE]
