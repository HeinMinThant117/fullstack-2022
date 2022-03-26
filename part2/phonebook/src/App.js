import { useEffect, useState } from 'react'
import personService from './services/persons'
import loginService from './services/login'
import './index.css'

const SearchFilter = ({ handleFilterChange }) => (
  <div>
    filter shown with : <input onChange={handleFilterChange} />
  </div>
)

// const PhoneForm = ({ handleNameChange, handlePhoneChange, handleSubmit }) => {
//   return (
//     <div>
//       <h2>Add new</h2>
//       <form>
//         <div>
//           name: <input onChange={handleNameChange} />
//         </div>
//         <div>
//           number: <input onChange={handlePhoneChange} />
//         </div>
//         <div>
//           <button onClick={handleSubmit} type='submit'>
//             add
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

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

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
              .catch((response) => {
                setErrorMessage(
                  `${data.name} is already deleted from the server`
                )
                setPersons(persons.filter((person) => person.id !== personId))
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
              })
          }
          //   alert(`${persons[i].name} is already added`)
          return
        }
      }

      const data = {
        id: persons[persons.length - 1].id + 1,
        name: newName,
        number: newPhone,
      }
      personService
        .create(data)
        .then((response) => {
          setPersons(persons.concat(response.data))
          setSuccessMessage(`Added ${response.data.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          //   console.log(error.response.data.error)
        })
      //   setPersons([...persons, { name: newName, number: newPhone }])
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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

  const phoneForm = () => (
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  return (
    <div>
      <h2>Phonebook</h2>

      {successMessage && <div className='success'>{successMessage}</div>}
      {errorMessage && <div className='error'>{errorMessage}</div>}

      <SearchFilter handleFilterChange={handleFilterChange} />
      {user ? phoneForm() : loginForm()}
      <NumbersList
        persons={persons}
        filter={filter}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
