const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const querystring = require('querystring');

const app = express();

const spotifyBaseUrl = 'https://api.spotify.com/v1/';

app.use(express.static(__dirname + '/static_files'));

app.get('/devices', function(req, res) {

  let token = req.query.token;

  let requestURL = spotifyBaseUrl + 'me/player/devices';

  let options = {
    url: requestURL,
    headers: { 'Authorization': 'Bearer ' + token },
    json: true
  };

  request.get(options, function(error, response, body) {
    res.send(body.devices);
  });
});

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

  let token = req.query.token;

  let requestURL = spotifyBaseUrl + 'recommendations/available-genre-seeds';

  let options = {
    url: requestURL,
    headers: { 'Authorization': 'Bearer ' + token },
    json: true
  };

  request.get(options, function(error, response, body) {
    res.json(body.genres);
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
  let tracks = req.query.tracks;
  let device_id = req.query.device_id;
  let token = req.query.token;

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
