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
const clientId = '6f6707d1f1194e35bf69150e7d79ffe3'; // Your client id
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

  requestURL = '/recommendations?seed_genres=' + genresString + '&target_tempo=' + targetTempo + '&token=' + _token;
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
        $('#songTempo').text('The BPM of this song is: ' + songTempo);
        if(data.tracks.length > 0) {
          data.tracks.forEach(function(track) {
            trackIds.push(track.id);
            trackUris.push(track.uri);
          });
          localStorage.setItem('currentTracks', trackUris.join());
          renderTracks(trackIds);
        } else {
          $('#tracks').append('<h2>No results. Try a broader search.</h2>')
        }
      } else if (currentGenres === '' && (targetTempo >= 40 && targetTempo <= 200)) {
        $('#tracks').append('<h2>No results. Please enter another song name first.</h2>')
      } else if (targetTempo !== '' && (targetTempo < 40 || targetTempo > 200)) {
        $('#tracks').append('<h2>No results. Please enter another song name first.</h2>')
      } else {
        $('#tracks').append('<h2>No results. Please enter another song name first.</h2>')
      }
    },
  });
}

function renderTracks(ids) {
  $.get('/tracks?ids=' + ids.join() + '&token=' + _token, function(tracks) {
    tracks.forEach(function(track) {
      let image = track.album.images ? track.album.images[0].url : 'https://upload.wikimedia.org/wikipedia/commons/3/3c/No-album-art.png';
      let trackElement = '<div class="track-element" id="' + track.uri + '"><div><img class="remove-icon" src="https://cdn.glitch.com/9641d2b3-59eb-408e-ab02-0b9bbd49b069%2Fremove-icon.png?1508341583541" onclick="remove(\'' + track.uri + '\');"/><img class="album-art" src="' + image + '"/><div><p id="track-name">' + track.name + '</p><p id="artist-name">' + track.artists[0].name + '</p></div></div><div id="track-buttons"><button type="button" onclick="saveSong(\'' + track.uri + '\');" class="btn btn-aubergine" id="saveButton" value="Save Song">Save Song</button><button type="button" onclick="play(\'' + track.uri + '\');" class="btn btn-aubergine" id="play-button" value="Play Song">Play Song</button></div></div>';
      $('#tracks').append(trackElement);
    })
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
