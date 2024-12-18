import Country from "./Country"

const Countries = ({countries, country, searchCountry}) => {
  if(countries.length > 10) 
    return <div><p>Too many matches, specify another filter</p></div>
  else if(countries.length === 1) {
    return <Country country={countries[0]} />
  } else if(countries.length === 0) {
    return
  } else {
    return countries.map((country) => <li key={country.name.common}>
      {country.name.common}
    </li>)
  }
}

export default Countries