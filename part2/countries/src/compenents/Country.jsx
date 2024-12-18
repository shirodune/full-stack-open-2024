const Country = ({country}) => {
  console.log(country);
  const languages = Object.entries(country.languages)
  console.log(languages);
  
  return <div>
    <h2>{country.name.common}</h2>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <br />
    <div>
      <strong>languages</strong>
      <ul> {
        languages.map((language) =>
            <li key={language[0]}>{language[1]}</li>
        )}        
      </ul>
    <div><img src={country.flags.png} alt={country.flags.alt} /></div>
    </div>
  </div>
}

export default Country