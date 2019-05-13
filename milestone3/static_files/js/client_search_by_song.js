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
        console.log(requestURL);
        console.log(_token);
        
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

function renderTracks(ids) {
  $.get('/tracks?ids=' + ids.join() + '&token=' + _token, function(tracks) {
    tracks.forEach(function(track) {
      let image = track.album.images ? track.album.images[0].url : 'https://upload.wikimedia.org/wikipedia/commons/3/3c/No-album-art.png';
      let trackElement = '<div class="track-element" id="' + track.uri + '"><div><img class="album-art" src="' + image + '"/><div><p id="track-name">' + track.name + '</p><p id="artist-name">' + track.artists[0].name + '</p></div></div></div>';
      $('#tracks').append(trackElement);
    })
  });
}
