# Team Name: 
___Greek 4 Life___

# Team Members: 
___Allston Fojas, Mark Tupas, Raul Garza, Cole Richmond___

# Screenshots:
### Screen 1 - Home Page (Index Page):
![Screenshot](/milestone4_pics/index.JPG)
From the last milestone, our previous search page allowed DJs to only look for song recommendations based on one of two criteria: beats per minute (BPM) or song name. In addition to these two options, we provided DJs the option to see their library of saved music in a separate page to provide a convenient location for DJs to easily reference their saved music, in case, for example, the DJ has not used our app for a while, so they forget their saved music. So, they can come back to our app and see their library of saved music.

### Screens 2 and 3 - Search by Song Name Page and Search by BPM Page:
![Screenshot](/milestone4_pics/search_by_song.JPG)
![Screenshot](/milestone4_pics/search_by_bpm.JPG)
Since the last milestone, we added a multiple column layout for song recommendation results for both pages. For the Search by BPM page, we included genres that are only relevant to our target audience of DJs, so we decreased the number of included genres by about half. For both pages, we decreased the size of the Go Back button and moved it to the top left corner to have a more intuitive layout for the Go Back button. In addition, for both pages, we included several buttons to save songs, play songs, and remove songs from the list of recommendations.

### Screen 4 - Saved Music Page:
![Screenshot](/milestone4_pics/saved_music.JPG)
From our last milestone, we did not include a Saved Music Page since we did not find this page to be part of our core functionality of providing song recommendations based on either beats per minute (BPM) or song name. So for this milestone, we decided to include a Saved Music Page to provide a convenient location for DJs to reference their library of saved songs. In this page, users can play songs and remove songs from their library of saved songs.

# Non-Trivial Actions

### Song Playback

The first non-trival feature we have chosen to implement in our application is the ability to play songs back through the user interface. After the user receives a list of songs from searching by either song title or beats per minute, they can hear a sample of the song from Spotify. The song is played by clicking anywhere on the album cover artwork, song title, or album title. Currently, the user has the ability to stop a song from playing by flipping the "Playback" option from *Yes* to *No*.

### Save Songs to Profile

The second non-trivial action we have implemented in our application allows a user to save songs to their profile so that they can be accessed later. This can be achieved on either search page depending on whether the user chooses to search by song title or by beats per minute. Once the list of songs appears, a user can then save the song by clicking the *Save This Song!* button. Once songs are saved to a list of save songs, the user can navigate to the Saved Music page and see their list of saved songs displayed with the options to play a song and remove a song from the list.

### Delete Songs from Profile

The third non-trivial action we have implemented in our application allows a user to delete songs either from their list of song recommendations in the search pages or their list of saved songs in the Saved Music page. If a user deletes a certain song from the list, then the rest of the songs will automatically move up the page so that there are no awkward gaps in the list of songs.
