import axios from "axios";
import { useEffect, useState } from "react";
const api_key = import.meta.env.VITE_SOME_KEY

const Country = ({country}) => {
  console.log(country);
  const [weather, setWeather] = useState(null)
  useEffect(()=> {
    const location = 
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
        console.log(response.data);
      })
  }, [])
  
  return <div>
    <h2>{country.name.common}</h2>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <br />
    <div>
      <strong>languages</strong>
      <ul> {
        Object.entries(country.languages).map((language) =>
            <li key={language[0]}>{language[1]}</li>
        )}        
      </ul>
    <div><img src={country.flags.png} alt={country.flags.alt} /></div>
    </div>
    {weather && <div><h2>Weather in {country.capital}</h2>
    <div>temperature {(weather.main.temp-273.15).toFixed(2)} Celcius</div>
    <div></div>
    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
    <div>wind {weather.wind.speed} m/s</div></div>}
  </div>
}

export default Country