const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const querystring = require('querystring');

const app = express();
const spotifyBaseUrl = 'https://api.spotify.com/v1/';
app.use(express.static(__dirname + '/static_files'));

app.post('/transfer', function(req, res) { 

  let device_id = req.query.device_id;
  let token = req.query.token;

  let requestURL = spotifyBaseUrl + 'me/player';
  
  let options = {
    url: requestURL,
    headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
    json: true,
    dataType: 'json',
    body: { "device_ids": [device_id] }
  };
  
  request.put(options, function(error, response, body) {
    res.sendStatus(200);
  });
});


app.get('/genres', function(req, res) {
  console.log('in /genres');

  let token = req.query.token;

  let requestURL = spotifyBaseUrl + 'recommendations/available-genre-seeds';

  let options = {
    url: requestURL,
    headers: { 'Authorization': 'Bearer ' + token },
    json: true
  };

  request.get(options, function(error, response, body) {
    console.log('error: ' + error);
    console.log('response: ' + response);
    console.log('body.genres: ' + body.genres);
    res.json(body.genres);
  });
});

app.get('/track', function(req, res) {
  console.log('in /track');

  let token = req.query.token;
  console.log('token: ' + token);

  let trackID = req.query.trackID;
  console.log('trackID: ' + trackID);

  let requestURL = spotifyBaseUrl + 'audio-features/' + trackID;
  console.log('requestURL: ' + requestURL);

  let options = {
    url: requestURL,
    headers: { 'Authorization': 'Bearer ' + token },
    json: true
  };
  console.log('options: ' + options);

  request.get(options, function(error, response, body) {
    console.log('error: ' + error);
    console.log('response: ' + response);
    console.log('body: ');
    console.log(body);
    res.json(body);
  });
});

app.get('/audio-analysis', function(req, res) {
  
  // Get token and remove from query object
  let token = req.query.token;
  delete req.query.token;

  console.log('in /audio-analysis');

  let requestURL = spotifyBaseUrl + 'audio-analysis/' + 
  querystring.stringify(req.query);

  console.log('requestURL: ' + requestURL);

  let options = {
    url: requestURL,
    headers: { 'Authorization': 'Bearer ' + token },
    json: true
  };

  request.get(options, function(error, response, body) {
    res.json(body);
  });
});

app.get('/search', function(req, res) {
  
  // Get token and remove from query object
  let token = req.query.token;
  delete req.query.token;

  console.log('in /search');

  let requestURL = spotifyBaseUrl + 'search?' + 
  querystring.stringify({
    limit: 1,
    market: 'from_token'
  }) + '&' +
  querystring.stringify(req.query);

  console.log('requestURL: ' + requestURL);

  let options = {
    url: requestURL,
    headers: { 'Authorization': 'Bearer ' + token },
    json: true
  };

  request.get(options, function(error, response, body) {
    res.json(body);
  });
});

app.get('/recommendations', function(req, res) {
  console.log('in /recommendations');
  
  // Get token and remove from query object
  let token = req.query.token;
  delete req.query.token;

  let requestURL = spotifyBaseUrl + 'recommendations?' + 
  querystring.stringify({
    limit: 20,
    market: 'from_token'
  }) + '&' +
  querystring.stringify(req.query);

  let options = {
    url: requestURL,
    headers: { 'Authorization': 'Bearer ' + token },
    json: true
  };

  request.get(options, function(error, response, body) {
    console.log('error: ' + error);
    console.log('response: ' + response);
    res.json(body);
  });
});

app.get('/recommendations2', function(req, res) {
  console.log('in /recommendations');
  
  // Get token and remove from query object
  let token = req.query.token;
  delete req.query.token;

  let requestURL = spotifyBaseUrl + 'recommendations?' + 
  querystring.stringify({
    limit: 21,
    market: 'from_token'
  }) + '&' +
  querystring.stringify(req.query);

  let options = {
    url: requestURL,
    headers: { 'Authorization': 'Bearer ' + token },
    json: true
  };

  request.get(options, function(error, response, body) {
    console.log('error: ' + error);
    console.log('response: ' + response);
    res.json(body);
  });
});

app.get('/tracks', function(req, res) {

  let ids = req.query.ids;
  let token = req.query.token;

  let requestURL = spotifyBaseUrl + 'tracks?' + 
  querystring.stringify({
    ids: ids,
    market: 'from_token'
  });

  let options = {
    url: requestURL,
    headers: { 'Authorization': 'Bearer ' + token },
    json: true
  };

  request.get(options, function(error, response, body) {
    res.json(body.tracks);
  });
});

app.post('/play', function(req, res) {
  console.log('in /play');
  let tracks = req.query.tracks;
  let device_id = req.query.device_id;
  let token = req.query.token;

  console.log('tracks: ' + tracks);
  console.log('device_id: ' + device_id);
  console.log('token: ' + token);

  let requestURL = spotifyBaseUrl + 'me/player/play?' +
  querystring.stringify({
    device_id: device_id
  });

  let options = {
    url: requestURL,
    headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
    json: true,
    dataType: 'json',
    body: { "uris": tracks.split(',') }
  };

  request.put(options, function(error, response, body) {
    res.sendStatus(200);
  });
});

app.post('/pause', function(req, res) {
  let token = req.query.token;

  let requestURL = spotifyBaseUrl + 'me/player/pause';

  let options = {
    url: requestURL,
    headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
    json: true,
    dataType: 'json',
  };

  request.put(options, function(error, response, body) {
    res.sendStatus(200);
  });
});

console.log('Listening on http://localhost:3000/');
app.listen(3000);
