# Team Name: 
___Greek 4 Life___

# Team Members: 
___Allston Fojas, Mark Tupas, Raul Garza, Cole Richmond___

# Target Population Utility:

These days beatmatching is considered basic among DJs in electronic dance music genres, and it is standard practice in clubs to keep the constant beat through the night, even if DJs change in the middle. One of the key things to consider when beatmatching is the tempo of both songs, and the musical theory behind the songs. Attempting to beatmatch songs with completely different beats per minute will result in one of the songs sounding too fast or too slow. As a DJ using our application with a song title or audio rate in mind, one can search for new songs of the same BPM to add to their arsenal. This prevents any sort of discrepancy when beatmatching and ensures that any song in the resulting list will be a good fit. Furthermore, the ability for a user to save songs in our application allows for continuous construction of their repertoire of songs. Once a DJ has built up a sufficient amount of audio, they can then begin building a synchronized, harmonic mix for their next gig!

# Screenshots:
### Screen 1 - Home Page (Index Page):

![Screenshot](/milestone5_pics/index.JPG)

From the last milestone, not much has changed in terms of affordances of the home page. Users are still able to look for song recommendations based on one of two criteria: beats per minute (BPM) or song name. Additionally, DJs still have the option to see their library of saved music, in case they navigate away from the application for some period of time or are looking to store a large number of songs. We have, however, altered the look and feel of the home page with the goal of making the music-finding experience even more intuitive for the user. The new color scheme is more appealing to the eye and helps guide the user's attention toward areas on the screen that are useful for them.

### Screens 2 & 3 - Search by BPM/Song Title Page(s):

![Screenshot](/milestone5_pics/search_by_song.JPG)
![Screenshot](/milestone5_pics/search_by_bpm.JPG)

Since the last milestone, we changed the button layout for the "Play" and "Save Song" functions. The play arrow and the heart symbol allow the user to carry out the two aforementioned actions and provide the user with feedback in the form of either an audio track or a confirmation popup. For the Search by Song Title page, we changed the way in which our search query returns matching audio. In the last milestone, the song that was searched for would (ideally) appear as the first result in your list of similar songs. However, we intended for the user to enter a song with the goal of receiving songs with similar BPMs in return. Therefore, we omitted the song that was searched for in our resulting list which gives the user 20 ***new*** songs instead of only 19, but kept the song that was searched for directly below the search bar in case the user still wants to save that song. Lastly, we thought that DJs would be interested in other audio features aside from BPM. So, we gave users the option to hover over the songs in their search results and see the song's key, energy, and danceability in addition to its BPM.

### Screen 4 - Saved Music Page:

![Screenshot](/milestone5_pics/saved_music.JPG)

The last milestone was the first version of our application that included the Saved Music page. The changes made to this page served the purpose of keeping the user interface consistent across all pages. Similar to the two aforementioned pages, the "Play Song" prompt has been replaced with the play arrow. Additionally, the columns have been reformatted to be in-line with the "Playback" function. Lastly, if a user no longer wants a song in their list of saved songs they can remove it by clicking on the marker to the left of the album cover.

### Data Visualization

![Screenshot](/milestone5_pics/data_visualization.JPG)

*A written explanation (***including screenshot***) of how you implemented your data display or visualizations, such as which libraries/frameworks you used (if any), how you hooked up to data APIs or databases, etc. (Again, you don't need a fancy visualization, but your data needs to be shown in a way that makes sense for your app.)*

# Ambitious Data Display

One idea that we came up with for ambitious data display is to make the audio features for each recommended song appear in a modal, similar to the one that appears when selecting genres. Implementing this feature would improve the readability of the audio features and would normalize the user interface even further.
