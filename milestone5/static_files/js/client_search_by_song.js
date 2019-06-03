const window_hash = window.location.hash
.substring(1)
.split('&')
.reduce((initial, item) => {
  if (item) {
    let parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});
window.location.hash = '';

let _token = window_hash.access_token;
const authEndpoint = 'https://accounts.spotify.com/authorize';

// Our app's client ID, redirect URI and desired scopes
const clientId = '0244dbc6e09c4ca1b3d6f7f6f80497ab'; // Your client id
const redirectUri = 'http://localhost:3000/search_by_song.html'; // Your redirect uri
const scopes = [
  'streaming',
  'user-read-birthdate',
  'user-read-email',
  'user-read-private',
  'playlist-modify-public',
  'user-modify-playback-state'
];

if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
}

// Page setup
let deviceId;
let playbackSetting;
setPlaybackSetting(1);

// Initialise Web Playback SDK
function onSpotifyPlayerAPIReady() {

  let player = new Spotify.Player({
    name: 'User',
    getOAuthToken: function(cb) {
      cb(_token)
    },
    volume: 0.8
  });

  player.on('ready', function(data) {
    deviceId = data.device_id;
    localStorage.setItem('browserDeviceID', data.device_id);
  });

  player.on('player_state_changed', function(data) {
    if(data) {
      let currentTrack = data.track_window.current_track.uri;
      updateCurrentlyPlaying(currentTrack);
    }
  });

  player.connect();
}

function setPlaybackSetting(setting) {
  playbackSetting = setting;

  if (setting == 0) {
    deviceId = null;
    pause();
    $('#current-playback').text('None');
    $('.track-element').removeClass('current-track');
  } else if (setting == 1) {
    setDevice(localStorage.getItem('browserDeviceID'));
    $('#current-playback').text('In Browser');
  }
}

function setDevice(id, name) {
  deviceId = id;
  $('#current-playback').text(name);
  $.post('/transfer?device_id=' + deviceId + '&token=' + _token);
}

function findSongID() {
  $('#searched-track').empty();
  requestURL = '/search?q=' + $('#songName').val() + '&type=track&market=US&limit=1' + '&token=' + _token;
  console.log('requestURL: ' + requestURL);

  $.ajax({
    url: requestURL,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log('You received some data!', data);
      if (data.tracks.items.length > 0) {
        const songID = data["tracks"]["items"]["0"]["id"];
        console.log('Song ID: ', songID);
        const songName = document.getElementById('songName');
        console.log('songName: ' + songName.value);
        console.log('requestURL: ' + requestURL);
        console.log('token: ' + _token);

        let searchedTrack = 'spotify:track:' + songID;
        console.log('searchedTrack: ' + searchedTrack);
        $('#searched-track').empty();
        renderTrack(searchedTrack);
        
        requestURL2 = 'https://api.spotify.com/v1/audio-features/' + songID; //get tempo of song
        $.ajax({
          url: requestURL2,
          type: 'GET',
          dataType: 'json',
          headers: {'Authorization': 'Bearer ' + _token},
          success: (data) => {
            console.log('Track Tempo: ', data.tempo);
            console.log(data);
            let songTempo = data.tempo;

            requestURL3 = 'https://api.spotify.com/v1/tracks/' + songID; //get artist ID
            $.ajax ({
              url: requestURL3,
              type: 'GET',
              dataType: 'json',
              headers: {'Authorization': 'Bearer ' + _token},
              success: (data) => {
                console.log(data);
                const artistID = data['artists']['0']['id'];
                console.log(artistID);

                requestURL4 = 'https://api.spotify.com/v1/artists/' + artistID; //get genres
                $.ajax ({
                  url: requestURL4,
                  type: 'GET',
                  dataType: 'json',
                  headers: {'Authorization': 'Bearer ' + _token},
                  success: (data) => {
                    console.log(Object.values(data.genres));
                    let artistGenres = Object.values(data.genres);
                    getSimilarRecommendations(artistGenres, songTempo);
                  }
                });
              }
            });
          }
        });
      } else {
        $('#tracks').empty();
        $('#songTempo').empty();
        $('#tracks').append('<h2>No results. Please enter another song name first.</h2>')
      }
    },
  });
}

//search_by_song.html function
function getSimilarRecommendations(artistGenres, songTempo) {
  let genres = artistGenres;
  let targetTempo = songTempo;
  let genresString = genres.join().replace(/ /g, '-');

  requestURL = '/recommendations2?seed_genres=' + genresString + '&target_tempo=' + targetTempo + '&token=' + _token;
  console.log('this is the genreString: ', genresString);
  console.log(targetTempo);
  console.log('here is the first genre ', genres[0]);
  console.log('requestURL: ' + requestURL);

  $.ajax({
    url: requestURL,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log('You received some data!', data);
      console.log(data);
      const genres = document.getElementById('genres');
      const currentGenres = artistGenres;
      const targetTempo = songTempo;
      console.log('currentGenres: ' + currentGenres);
      console.log('targetTempo: ' + targetTempo);
      console.log('current genre ' + currentGenres[0]);

      $('#tracks').empty();
      $('#songTempo').empty();
      let trackIds = [];
      let trackUris = [];
      if(data.tracks && (currentGenres !== '') && (targetTempo >= 40 && targetTempo <= 200)) {
        if(data.tracks.length > 0) {
          $('#songTempo').text("Your searched song is shown above, and song recommendations are shown below. Hover over a song's album art to see its audio features.");
          data.tracks.forEach(function(track) {
            trackIds.push(track.id);
            trackUris.push(track.uri);
          });
          localStorage.setItem('currentTracks', trackUris.join());
          renderTracks(trackIds);
        } else {
          $('#songTempo').text("Your searched song is shown above, but there are no recommendations available. Hover over its album art to see its audio features.");
        }
      } else if (currentGenres === '' && (targetTempo >= 40 && targetTempo <= 200)) {
        $('#tracks').append('<h2>No results. Please enter another song name.</h2>');
      } else if (targetTempo !== '' && (targetTempo < 40 || targetTempo > 200)) {
        $('#tracks').append('<h2>No results. Please enter another song name.</h2>');
      } else {
        $('#tracks').append('<h2>No results. Please enter another song name.</h2>');
        console.log('currentGenres: ' , currentGenres);
        console.log('data.tracks: ' , data.tracks);
        console.log('targetTempo: ' , targetTempo);
      }
    },
  });
}

//change pitch key from number to letter
const pitch_class = {
  '-1': "No key detected",
  '0': "C",
  '1': "C♯, D♭",
  '2': "D",
  '3': "D♯, E♭",
  '4': "E",
  '5': "F",
  '6': "F♯, G♭",
  '7': "G",
  '8': "G♯, A♭",
  '9': "A",
  '10': "A♯, B♭",
  '11': "B"
}

function renderTrack(ids) {
  console.log('in renderTrack with ids: ' + ids);
  $.get('/tracks?ids=' + ids.substring(14) + '&token=' + _token, function(tracks) {
    tracks.forEach(function(track) {
      $.get('/track?trackID=' + track.uri.substring(14) + '&token=' + _token, function(trackDetails) {
        let image = track.album.images ? track.album.images[0].url : 'https://upload.wikimedia.org/wikipedia/commons/3/3c/No-album-art.png';
        let trackElement = '<div class="track-element" id="' + track.uri + '"><div><div class="img_wrap"><img class="album-art" src="' + image + '"/><ul class="img_description"><p id="tempo_hidden">BPM: ' + trackDetails.tempo + '</p><p id="key_hidden">Key: ' + pitch_class[trackDetails.key.toString()] + '</p><p id="energy_hidden">Energy: ' + trackDetails.energy + '</p><p id="danceability_hidden">Danceability: ' + trackDetails.danceability + '</p></ul></div><div><p id="track-name">' + track.name + '</p><p id="artist-name">' + track.artists[0].name + '</p></div></div><ul style="list-style: none;"><li><div class="icon_wrap"><img class="play-icon" src="images/play.png" onclick="play(\'' + track.uri + '\');"/><ul class="icon_description" onclick="play(\'' + track.uri + '\');"><p id="play_hidden">Play</p></ul></div></li><li><div class="icon_wrap"><img class="save-song-icon" src="images/save-song.png" onclick="saveSong(\'' + track.uri + '\');"/><ul class="icon_description" onclick="saveSong(\'' + track.uri + '\');"><p id="save_hidden">Save</p></ul></div></li></ul></div></div>';
        console.log('about to exit renderTrack');
        $('#searched-track').append(trackElement);
        console.log('track.uri: ' + track.uri);
        console.log('trackDetails: ');
        console.log(trackDetails);
      });
    });
  });
}

//updated code in client_search_by_song.js
function renderTracks(ids) {
  console.log('in renderTracks with ids: ' + ids);
  $.get('/tracks?ids=' + ids.join() + '&token=' + _token, function(tracks) {
    tracks.forEach(function(track) {
      let searchedTrackID = $('#searched-track .track-element').attr('id').substring(14);
      let trackID = track.uri.substring(14);
      if (trackID != searchedTrackID) {
        $.get('/track?trackID=' + track.uri.substring(14) + '&token=' + _token, function(trackDetails) {
          let image = track.album.images ? track.album.images[0].url : 'https://upload.wikimedia.org/wikipedia/commons/3/3c/No-album-art.png';
          let trackElement = '<div class="track-element" id="' + track.uri + '"><div><img class="remove-icon" src="../images/remove-icon.png" onclick="remove(\'' + track.uri + '\');"/><div class="img_wrap"><img class="album-art" src="' + image + '"/><ul class="img_description"><p id="tempo_hidden">BPM: ' + trackDetails.tempo + '</p><p id="key_hidden">Key: ' + trackDetails.key + '</p><p id="energy_hidden">Energy: ' + trackDetails.energy + '</p><p id="danceability_hidden">Danceability: ' + trackDetails.danceability + '</p></ul></div><div><p id="track-name">' + track.name + '</p><p id="artist-name">' + track.artists[0].name + '</p></div></div><ul style="list-style: none;"><li><div class="icon_wrap"><img class="play-icon" src="images/play.png" onclick="play(\'' + track.uri + '\');"/><ul class="icon_description" onclick="play(\'' + track.uri + '\');"><p id="play_hidden">Play</p></ul></div></li><li><div class="icon_wrap"><img class="save-song-icon" src="images/save-song.png" onclick="saveSong(\'' + track.uri + '\');"/><ul class="icon_description" onclick="saveSong(\'' + track.uri + '\');"><p id="save_hidden">Save</p></ul></div></li></ul></div></div>';
          $('#tracks').append(trackElement);
          console.log('track.uri: ' + track.uri);
          console.log('trackDetails: ');
          console.log(trackDetails);
        });
      }
    });
  });
}

function saveSong(track) {
  const savedSongsList = localStorage.getItem('savedSongs') ? localStorage.getItem('savedSongs').split(',') : [];
  console.log('savedSongs before addition: ' + savedSongsList);
  console.log(typeof savedSongsList);
  console.log('track: ' + track);

  let trackID = track.substring(14);
  console.log('trackID: ' + trackID);

  let alreadySaved = false;

  for (index in savedSongsList) {
    if (trackID == savedSongsList[index]) {
      alreadySaved = true;
    }
  }

  if (alreadySaved) {
    alert("This song has already been saved to your profile.");
  } else {
    savedSongsList.push(trackID);
    alert("Song added to your profile!");
    localStorage.setItem('savedSongs', savedSongsList);
  }

  console.log('savedSongs after addition: ' + savedSongsList);
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function updateCurrentlyPlaying(track) {
  console.log('in updateCurrentlyPlaying with this track: ' + track);
  let trackElement = document.getElementById(track);
  $('.track-element').removeClass('current-track');
  if(trackElement) {
    trackElement.className += " current-track";
  }
}

function play(track) {
  console.log('Current track playing: ' + track);
  if(playbackSetting != 0) {
    console.log('play requestURL: ' + '/play?tracks=' + track + '&device_id=' + deviceId + '&token=' + _token);
    $.post('/play?tracks=' + track + '&device_id=' + deviceId + '&token=' + _token);
  }
}

function pause() {
  $.post('/pause?token=' + _token);
}

function remove(track) {
  let trackList = localStorage.getItem('currentTracks').split(',');
  trackList = trackList.filter(item => item != track);
  localStorage.setItem('currentTracks', trackList.join());
  let elementId = '#' + track;
  let element = document.getElementById(track);
  element.outerHTML = "";
  delete element;
  alert("This song has been removed from the list of recommendations.");
}
