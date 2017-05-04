var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Api = require('./utils/api');

var query = ''; 
var cities = [];
var citiesWeather = []; 
var currentCity = 0; 

var Weather = React.createClass({ 
  getInitialState () {
    return {
      weather: '',
      temp: 0,
      humidity: 0,
      wind: 0
    }  
},

  componentWillMount () {
    cities[0] = 'San Francisco'; 
      this.fetchData();
    },
    
    fetchData () {    
      if (citiesWeather[currentCity]) {
        this.updateData();   
      }
      else {
        Api.get(cities[currentCity])
        .then(function(data) {
          citiesWeather[currentCity] = data;
          this.updateData();
          }.bind(this));
      }
    },
    
    updateData () {
      this.setState({
        weather: citiesWeather[currentCity].weather[0].id,
        temp: Math.round((9/5) * (citiesWeather[currentCity].main.temp - 273) + 32),
        humidity: Math.round(citiesWeather[currentCity].main.humidity),
        wind: Math.round(citiesWeather[currentCity].wind.speed)
      });
    },
    
    render () {
        
      var weatherClass = classNames('wi wi-owm-' + this.state.weather);
      var bgColorClass = 'weather-widget ';
      
      if (this.state.temp >= 90) {
        bgColorClass += 'very-warm';
      } else if (this.state.temp > 75 && this.state.temp < 90) {
        bgColorClass += 'warm';
      } else if (this.state.temp > 60 && this.state.temp < 75) {
        bgColorClass += 'normal';
      } else if (this.state.temp > 45 && this.state.temp < 60) {
        bgColorClass += 'cold';
      } else if (this.state.temp <= 45) {
        bgColorClass += 'very-cold';
      }
      
      return <div className={bgColorClass}>
        <h1 className="city">{cities[currentCity]}</h1>
        <div className="weather">
          <i className={weatherClass}></i>
        </div>
        <section className="weather-details">
          <div className="temp"><span className="temp-number">{this.state.temp}</span><span className="wi wi-degrees"></span></div>
          <div className="humidity"><i className="wi wi-raindrop"></i>{this.state.humidity} %</div>
          <div className="wind"><i className="wi wi-small-craft-advisory"></i>{this.state.wind} <span className="vel">Km/h</span></div>
        </section>
        </div>
    }
});

var element = React.createElement(Weather, {});
ReactDOM.render(element, document.querySelector('.container'));