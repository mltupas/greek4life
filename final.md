# Team Name: 
___Greek 4 Life___

# Team Members Contributions

*Here are bullet points briefly describing each of our contributions to our team's project.*

___Allston Fojas___
* Wrote the backend code in each of the JS pages for each respective HTML page to access the Spotify API's endpoints and Firebase to update the realtime database
* Wrote the server code to access and use the relevant Spotify API endpoints, such as playing and pausing a song, getting a song's audio features, and getting a list of song recommendations based on certain search parameters
* Wrote the code to gain access to Firebase and use it instead of LocalStorage
* Wrote the code documentation as comments within each source code file
* Helped combine frontend code with backend code to get our app to work and meet the requirements for each milestone
* Helped with some CSS code, particularly to center text on the search pages

___Mark Tupas___ 
* Wrote backend code for JS files, including AJAX calls to Spotify's API and displaying returned information to frontend
* Wrote code for web app features such as the on-hover feature on album art, dual-column song display, and localStorage function (subsequently replaced with Firebase) to display saved songs
* Facilitated ease of use of web app by restructuring page layout, creating auto-popup menus (when first entering search_by_bpm.html), and providing visual cues to user (asterisks to denote required fields).
* Provided a screen capture of our application to demonstrate its various uses in a demo video

___Raul Garza___
*  Helped on providing design themes for the intended web app users.
*  Worked on creating UI for the entire homepage and writing front-end code in HTML & CSS for the rest of the pages seen.
*  Worked on creating unifying color scheme and font choice for the Music Master brand.
*  Assited Allston in coding the JS portion of the play and save buttons used in both search pages.
*  Used Pixelmator Pro graphic editing software to create the Music Master logos and accompanying graphic images seen throughout Music Master.

___Cole Richmond___
* Created the initial storyboards for the team's original project idea that were eventually scrapped and replaced with Music Master.
* Assisted in the front-end development (HTML & JS) of the application to ensure there were no dead-ends and the user was able to get from start to finish with no issue.
* Worked to set up and complete each milestone's markdown file so that all rubric items were met and the team had a clear plan for the week's tasks in the team repository on GitHub.
* Worked with Mark to complete the application's video walkthrough by providing audio in the form of narration as well as background music in iMovie.

# Source Code Files

*Here is a list of all source code files in our GitHub project repository that we wrote, along with a brief description of what functionality is implemented in each file. The top-level directory is the 'final' folder, with each new level represented as one indentation.*

final

> static_files

>> css

>>> search_pages.css

* This file contains the CSS code to standardize the text font and size, color scheme, and layout of the search pages. That way, we have the Go to Home Page button in the top left corner, playback functionality under the Go to Home Page button, Saved Music icon in the top right corner, list of songs such that the display is the following from left to right: remove icon, album art, song name and artist name, and play and save icons. In addition, when the user plays a song, the background of that song turns to green, which indicates to the user that the current song is playing. 

>>> style.css

* This file contains the CSS code to standardize the text font and size, color scheme, and layout of the index page. That way, we have the Saved Music icon in the top left corner, app logo in the center with the introductory text, and the vinyl records icons that act as buttons to search by either a BPM value or a song title to receive a list of song recommendations. 

>> js

>>> client_saved_music.js

* This file contains the Spotify API and Firebase credentials to have our application access Spotify to play, pause, and update the currently playing music, and display the saved music, and access Firebase to access and remove any saved songs, and other settings in their realtime database.

>>> client_search_by_bpm.js

* This file contains the Spotify API and Firebase credentials to have our application access Spotify to play, pause, and update the currently playing music, get a list of genres, search for song recommendations based on genres and a target BPM value, get a list of song recommendations, and display the recommendations with the option to remove any recommendations from the current list of recommendations, and access Firebase to save songs, current song recommendations, and other settings in their realtime database.

>>> client_search_by_song.js

* This file contains the Spotify API and Firebase credentials to have our application access Spotify to play, pause, and update the currently playing music, search for song recommendations based on a song title, get a list of song recommendations, and display the recommendations with the option to remove any recommendations from the current list of recommendations, and access Firebase to save songs, current song recommendations, and other settings in their realtime database.

>> index.html

* This is the home page for our application. From this page, the user can decide to do one of three things: see their saved songs from prior interactions with the application, choose to search for new songs by their tempo (measured in beats per mimute), or choose to search for new songs that share similar a similar tempo with the song that was searched for. Additionally, this file contains the images of our logo, an image of a DJ and images of vinyl records to stay consistent with our target audience of DJs. In addition, the vinyl records act as buttons to search by either a BPM value or a song title to receive a list of song recommendations for DJs to use for their next mix/playlist. Finally, there is a reference to the Firebase JS SDK so our application uses the realtime database offered by Firebase.

>> saved_music.html

* This page is where users are able to store their favorite songs to be used later. Additionally, users are able to play their saved songs using the playback setting from the Spotify API as well as remove songs from their list of saved songs. Furthermore, this file contains the function to display a user's list of saved songs that the DJ could use for their next mix/playlist. We get playback functionality and other useful functions by using the Spotify API, which is referenced in the <head>. This file includes a Go to Home Page button, playback functionality, and a display of the user's list of saved songs. The user can see each song's important audio features and play the song to help them create their next mix/playlist. Finally, there is a reference to the Firebase JS SDK so our application uses the realtime database offered by Firebase.

>> search_by_bpm.html

* This file contains the function to search by a BPM value to receive a list of song recommendations for DJs to use for their next mix/playlist. We get song recommendations and other useful functions by using the Spotify API, which is referenced in the <head>. This file includes a Go to Home Page button, a modal to select up to 5 genres, playback functionality, a text box to input a BPM value, a Search button, a Saved Songs button, and some descriptive text to inform the user on how to navigate this page. Additionally, when the user clicks Search, the list of song recommendations get displayed, where the user can see each song's important audio features, play the song, and save the song to their saved songs. Finally, there is a reference to the Firebase JS SDK so our application uses the realtime database offered by Firebase.

>> search_by_song.html

* This file contains the function to search by a song title to receive a list of song recommendations for DJs to use for their next mix/playlist. We get song recommendations and other useful functions by using the Spotify API, which is referenced in the <head>. This file includes a Go to Home Page button, playback functionality, a text box to input a song title, a Search button, a Saved Songs button, and some descriptive text to inform the user on how to navigate this page. Additionally, when the user clicks Search, the list of song recommendations get displayed, where the user can see each song's important audio features, play the song, and save the song to their saved songs. Finally, there is a reference to the Firebase JS SDK so our application uses the realtime database offered by Firebase.

> server.js

* Specifically, this file contains certain frameworks and libraries, such as express, request, and querystring, that help accessing certain Spotify API endpoints. In addition, this file contains the GET and POST requests to relevant Spotify API endpoints, such as getting song recommendations, playing and pausing a song, and getting a song's audio features, that makes our application work. This file also contains the call to open our application on localhost:3000.

# Presentation Slide

https://docs.google.com/presentation/d/1grHH8VHdZIFrviFxI0kQxHAs-roQo7u2T-Za-w8myBU/edit?usp=sharing

# Demo Video

https://www.youtube.com/watch?v=s2GJyBFRPrw&feature=youtu.be
