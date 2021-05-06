const locations = document.getElementById('location');
const weather = document.querySelector('#weather');
const weatherinfo = document.getElementById('weatherinfo');
const conditioninfo = document.getElementById('conditioninfo');
const searchbut = document.getElementById('searchbut');
const weatherimg = document.getElementById('weatherimg');
const weathericon = document.getElementById('weathericon');
const key = '8JIHlxkGYO0jvFAfdSg2vajm2nAjw9EA';

const updateUI = (data) =>{
  const cityDets = data.cityDets;
  const weather = data.weather;

  conditioninfo.innerHTML = `
  <div id="cityheader">
    <h3 id="Cityname">${cityDets.EnglishName}</h5>
  </div>
  <div id="condition">${weather.WeatherText}</div>
  <div id="temp">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
  `
  weatherimg.innerHTML = weather.IsDayTime ? '<img src="images/day.jpg" alt="">' : '<img src="images/night.jpg" alt="">';

  weathericon.innerHTML = `<img class = "weatheri" src="icons/${weather.WeatherIcon}.svg" alt="">`;

}

const getWeather = async (id) =>{
  
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];

}

const getCity = async (city) =>{
  const  base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
}

const updateCity = async (city) =>{

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets,
    weather
  };

}

locations.addEventListener('submit', e =>{

  e.preventDefault();

  const city = locations.locationbar.value.trim();
  locations.reset();

  updateCity(city)
  .then(data => {
    locations.classList.add('d-none');
    weather.classList.remove('d-none');
    updateUI(data)})
  .catch(err => {
    locations.classList.remove('d-none');
    weather.classList.add('d-none');
  });

  localStorage.setItem('city', city);
})
searchbut.addEventListener('click', ()=>{
  locations.classList.remove('d-none');
  weather.classList.add('d-none');
})

if (localStorage.getItem('city')){
  locations.classList.add('d-none');
  weather.classList.remove('d-none');
  updateCity(localStorage.getItem('city'))
  .then(data => updateUI(data))
  .catch(err => console.log(err));
}