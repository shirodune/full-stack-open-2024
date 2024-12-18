import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('green')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.includes(filterName))

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  const setAlterMessage = (message, color) => {
    setMessage(message)
    setColor(color)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const isExist = persons.find(person => person.name === newName)
    console.log(isExist);
    
    if(isExist) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = { ...isExist, number: newPhone}
        console.log(personObject);
        personService
          .update(isExist.id, personObject)
          .then(response => {
            console.log(response);
            setPersons(persons.map(person => person.id === personObject.id? response : person))
            setAlterMessage(`Updated ${newName}`, 'green')
          })
          .catch(error => {
            console.log('fail');
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newPhone
      }
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setAlterMessage(`Added ${newName}`, 'green')
      })      
    }

    setNewName('')
    setNewPhone('')
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(t => {
          personService
          .getAll()
          .then(response => {
            setPersons(response)
            alert(`${person.name} has deleted!`)
          })
        })
        .catch(error => {
          setAlterMessage(`Information of ${person.name} has already been removed from server`, 'red')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} color={color}/>

      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange} />

      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newPhone={newPhone} handlePhoneChange={handlePhoneChange} />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} deletePerson={deletePerson} />

    </div>
  )
}

export default App