import { useState } from 'react'

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

const NumbersList = ({ persons, filter }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons
        .filter((person) => new RegExp(filter, 'i').test(person.name))
        .map((filteredPerson) => (
          <p>
            {filteredPerson.name} - {filteredPerson.number}
          </p>
        ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0925123123' },
  ])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (newName !== '') {
      for (let i = 0; i < persons.length; i++) {
        if (newName === persons[i].name) {
          alert(`${persons[i].name} is already added`)
          return
        }
      }
      setPersons([...persons, { name: newName, number: newPhone }])
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
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
      <NumbersList persons={persons} filter={filter} />
    </div>
  )
}

export default App
