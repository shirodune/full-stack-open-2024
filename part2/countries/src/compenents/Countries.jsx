import Country from "./Country"

const Countries = ({countries, countryToShow, handleSetCountryToShow}) => {
  if(countries.length > 10) 
    return <div><p>Too many matches, specify another filter</p></div>
  else if(countries.length === 1) {
    return <Country country={countries[0]} />
  } else if(countries.length === 0) {
    return
  } else {
    return <div>
      {countries.map((country) => <li key={country.name.common}>
        {country.name.common} <button onClick={() => handleSetCountryToShow(country)}>show</button>
      </li>)}
      {countryToShow && countries.find(country => country.name.common === countryToShow.name.common) &&
        <Country country={countryToShow} />
      }
    </div>
  }
}

export default Countries