const window_hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
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
const redirectUri = 'http://localhost:3000/search_by_bpm.html'; // Your redirect uri
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

genreLimitAlert("off");

function genreLimitAlert(state) {
  if(state == "on") {
    $('#genreLimitAlert').show();
  } else {
    $('#genreLimitAlert').hide();
  }
}

function getGenresList() {
  $('#genres-list').empty();
  $.get('/genres?token=' + _token, function(genres) {
    genres.forEach(function(genre) {
      let genreButtonElement = '<label class="btn btn-salmon btn-sm" id="genre-button"><input type="checkbox" value="' + genre + '">' + genre + '</label>';
      $('#genres-list').append(genreButtonElement);
    });
  });
  
  $('#genres-list').on('change', 'input', function() {
    if($('#genres-list input:checked').length > 5) {
      $(this).parent().removeClass("active");
      this.checked = false;
      genreLimitAlert("on");
    }
    else {
      genreLimitAlert("off");
    }
  });
}

function findSongID() {
  requestURL = '/recommendations?seed_genres=' + genresString + '&target_tempo=' + $('#targetTempo').val() + '&token=' + _token;
  console.log('requestURL: ' + requestURL);

  $.ajax({
    url: requestURL,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log('You received some data!', data);
      const genres = document.getElementById('genres');
      const currentGenres = genres.getElementsByTagName('span');
      const targetTempo = document.getElementById('targetTempo');
      console.log('currentGenres: ' + currentGenres[0].innerHTML);
      console.log('targetTempo: ' + targetTempo.value);

      $('#tracks').empty();
      let trackIds = [];
      let trackUris = [];
      if(data.tracks && (currentGenres[0].innerHTML !== '') && (targetTempo.value >= 40 && targetTempo.value <= 200)) {
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
      } else if (currentGenres[0].innerHTML === '' && (targetTempo.value >= 40 && targetTempo.value <= 200)) {
        $('#tracks').append('<h2>No results. Please enter genres first.</h2>')
      } else if (targetTempo.value !== '' && (targetTempo.value < 40 || targetTempo.value > 200)) {
        $('#tracks').append('<h2>No results. Please enter a valid BPM value first.</h2>')
      } else {
        $('#tracks').append('<h2>No results. Please enter a BPM value first.</h2>')
      }
    },
  });
}

function updateGenres() {
  // Get selected genres
  let genres = [];
  $('#genres-list input:checked').each(function() {
    genres.push($(this).val());
  });
  let genresString = genres.join();
  localStorage.setItem('currentGenres', genresString);
  $('#current-genres').text(genresString);

  const genresId = document.getElementById('genres');
  const currentGenres = genresId.getElementsByTagName('span');
  console.log('currentGenres: ' + currentGenres[0].innerHTML);

  $('#tracks').empty();
  if (targetTempo.value === '') {
    $('#tracks').append('<h2>Please enter a BPM value. Then, click Search.</h2>')
  } else if ((currentGenres[0].innerHTML !== '') && (targetTempo.value >= 40 && targetTempo.value <= 200)) {
    $('#tracks').append('<h2>Now, click Search.</h2>')
  }
}

function getRecommendations() {
  // Get selected genres
  let genres = [];
  $('#genres-list input:checked').each(function() {
    genres.push($(this).val());
  });
  let genresString = genres.join();
  localStorage.setItem('currentGenres', genresString);
  $('#current-genres').text(genresString);
  
  requestURL = '/recommendations?seed_genres=' + genresString + '&target_tempo=' + $('#targetTempo').val() + '&token=' + _token;
  console.log('requestURL: ' + requestURL);

  $.ajax({
    url: requestURL,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log('You received some data!', data);
      const genres = document.getElementById('genres');
      const currentGenres = genres.getElementsByTagName('span');
      const targetTempo = document.getElementById('targetTempo');
      console.log('currentGenres: ' + currentGenres[0].innerHTML);
      console.log('targetTempo: ' + targetTempo.value);

      $('#tracks').empty();
      let trackIds = [];
      let trackUris = [];
      if(data.tracks && (currentGenres[0].innerHTML !== '') && (targetTempo.value >= 40 && targetTempo.value <= 200)) {
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
      } else if (currentGenres[0].innerHTML === '' && (targetTempo.value >= 40 && targetTempo.value <= 200)) {
        $('#tracks').append('<h2>No results. Please enter genres first.</h2>')
      } else if (targetTempo.value !== '' && (targetTempo.value < 40 || targetTempo.value > 200)) {
        $('#tracks').append('<h2>No results. Please enter a valid BPM value first.</h2>')
      } else {
        $('#tracks').append('<h2>No results. Please enter a BPM value first.</h2>')
      }
    },
  });
}

function renderTracks(ids) {
  $.get('/tracks?ids=' + ids.join() + '&token=' + _token, function(tracks) {
    tracks.forEach(function(track) {
      let image = track.album.images ? track.album.images[0].url : 'https://upload.wikimedia.org/wikipedia/commons/3/3c/No-album-art.png';
      let trackElement = '<div class="track-element" id="' + track.uri + '"><div><img class="album-art" src="' + image + '"/><div><p id="track-name">' + track.name + '</p><p id="artist-name">' + track.artists[0].name + '</p></div></div></div>';
      $('#tracks').append(trackElement);
    })
  });
}
