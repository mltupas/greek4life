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
const redirectUri = 'http://localhost:3000/saved_music.html'; // Your redirect uri
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

const savedSongs = localStorage.getItem('savedSongs') ? localStorage.getItem('savedSongs') : [];
console.log('savedSongs: ' + savedSongs);

function renderTracks(savedSongs) {
  console.log('in renderTracks');
  console.log('savedSongs: ' + savedSongs);
  $.get('/tracks?ids=' + savedSongs + '&token=' + _token, function(tracks) {
    tracks.forEach(function(track) {
      $.get('/track?trackID=' + track.uri.substring(14) + '&token=' + _token, function(trackDetails) {
        let image = track.album.images ? track.album.images[0].url : 'https://upload.wikimedia.org/wikipedia/commons/3/3c/No-album-art.png';
        let trackElement = '<div class="track-element" id="' + track.uri + '"><div><img class="remove-icon" src="https://cdn.glitch.com/9641d2b3-59eb-408e-ab02-0b9bbd49b069%2Fremove-icon.png?1508341583541" onclick="remove(\'' + track.uri + '\');"/><div class="img_wrap"><img class="album-art" src="' + image + '"/><ul class="img_description"><p id="tempo_hidden">BPM: ' + trackDetails.tempo + '</p><p id="key_hidden">Key: ' + trackDetails.key + '</p><p id="energy_hidden">Energy: ' + trackDetails.energy + '</p><p id="danceability_hidden">Danceability: ' + trackDetails.danceability + '</p></ul></div><div><p id="track-name">' + track.name + '</p><p id="artist-name">' + track.artists[0].name + '</p></div></div><ul style="list-style: none;"><li><div class="icon_wrap"><img class="play-icon" src="images/play.png" onclick="play(\'' + track.uri + '\');"/><ul class="icon_description" onclick="play(\'' + track.uri + '\');"><p id="play_hidden">Play</p></ul></div></li></ul></div></div>';
        $('#tracks').append(trackElement);
        console.log('track.uri: ' + track.uri);
        console.log('trackDetails: ');
        console.log(trackDetails);
      });
    })
  });
}

renderTracks(savedSongs);

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
  let trackID = track.substring(14);
  console.log('trackID: ' + trackID);

  let trackList = localStorage.getItem('savedSongs').split(',');
  trackList = trackList.filter(item => item != trackID);
  localStorage.setItem('savedSongs', trackList.join());
  // let elementId = '#' + track;
  let element = document.getElementById(track);
  element.outerHTML = "";
  delete element;
  alert("This song has been removed from the list of saved songs.");
}