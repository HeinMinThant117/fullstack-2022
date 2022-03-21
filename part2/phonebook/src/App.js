import axios from 'axios'
import { useEffect, useState } from 'react'
import personService from './services/persons'

const SearchFilter = ({ handleFilterChange }) => (
  <div>
    filter shown with : <input onChange={handleFilterChange} />
  </div>
)

const PhoneForm = ({ handleNameChange, handlePhoneChange, handleSubmit }) => {
  return (
    <div>
      <h2>Add new</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handlePhoneChange} />
        </div>
        <div>
          <button onClick={handleSubmit} type='submit'>
            add
          </button>
        </div>
      </form>
    </div>
  )
}

const NumbersList = ({ persons, filter, handleDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons
        .filter((person) => new RegExp(filter, 'i').test(person.name))
        .map((filteredPerson) => (
          <div key={filteredPerson.id}>
            {filteredPerson.name} - {filteredPerson.number}
            <button onClick={() => handleDelete(filteredPerson)}>delete</button>
          </div>
        ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response.data))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (newName !== '') {
      for (let i = 0; i < persons.length; i++) {
        if (newName === persons[i].name) {
          if (
            window.confirm(
              `${persons[i].name} is already added, update phone number ?`
            )
          ) {
            let personId = persons[i].id
            let data = {
              name: newName,
              number: newPhone,
            }

            personService
              .update(personId, data)
              .then((response) =>
                setPersons(
                  persons.map((person) =>
                    person.id === response.data.id ? response.data : person
                  )
                )
              )
          }
          //   alert(`${persons[i].name} is already added`)
          return
        }
      }

      const data = { id: persons.length + 1, name: newName, number: newPhone }
      personService
        .create(data)
        .then((response) => setPersons(persons.concat(response.data)))
      //   setPersons([...persons, { name: newName, number: newPhone }])
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleDelete = (person) => {
    let personId = person.id
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(personId)
        .then((response) =>
          setPersons(
            persons.filter((filterPerson) => filterPerson.id !== personId)
          )
        )
    }
  }

  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter handleFilterChange={handleFilterChange} />
      <PhoneForm
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        handleSubmit={handleSubmit}
      />
      <NumbersList
        persons={persons}
        filter={filter}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
