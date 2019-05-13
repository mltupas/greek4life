const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const querystring = require('querystring');

const app = express();

const spotifyBaseUrl = 'https://api.spotify.com/v1/';

// app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/static_files'));

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

  console.log('in /audio-analysis')
  console.log('req.query: ' + req.query);

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

  console.log('in /search')
  console.log('req.query: ' + req.query.text);

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

console.log('Listening on http://localhost:3000/home.html');
app.listen(3000);
