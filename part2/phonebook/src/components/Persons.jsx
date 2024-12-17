const Persons = ({persons, deletePerson}) => <div>{
  persons.map((person) => <li key={person.id}> 
    {person.name} {person.number}
    <button onClick={() => deletePerson(person.id)}>
      delete
    </button>
  </li>)
}</div>
export default Persons