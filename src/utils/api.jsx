
var Fetch = require('whatwg-fetch');
var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
var apiUrl = '&appid=45199af1b99f906745a5417d702bb9e7';

module.exports = {
  get: function(place) {
    return fetch(rootUrl + place + apiUrl, {
      headers: {}
    })
    .then(function(response) {
      return response.json();
    });
  }
};