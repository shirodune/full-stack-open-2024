import { useEffect, useState } from 'react'
import axios from "axios"
import Search from './compenents/Search'
import Countries from './compenents/Countries'
const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => setCountries(response.data))
  }, [])

  const filterCountries = countries.filter(country => country.name.common.toLowerCase().includes(search))

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)

  }

  return (
    <div>
      <p>Hello world</p>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <Countries countries={filterCountries}/>
    </div>
  )
}

export default App