var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Api = require('./utils/api');

var query = ''; 
var cities = [];
var citiesWeather = []; 
var currentCity = 0; 

var Weather = React.createClass({ 
  getInitialState: function() {
    return {
      weather: '',
      temp: 0,
      humidity: 0,
      wind: 0
    }  
},