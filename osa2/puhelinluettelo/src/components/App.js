import React, { useState, useEffect } from 'react'
import personService from '../services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ success, setSuccess ] = useState(true)

  const displayMessage = (msg, duration, successful) => {
    setSuccess(successful)
    setMessage(msg, success)
    setTimeout(() => {
      setMessage(null)
    }, duration)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
    }, [])

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Notification message={message} success={success} />

      <h2>Hakurajaus</h2>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />

      <h2>Lisää uusi</h2>
      <PersonForm newName={newName} setNewName={setNewName}
                  newNumber={newNumber} setNewNumber={setNewNumber}
                  persons={persons} setPersons={setPersons}
                  displayMessage={displayMessage} />

      <h2>Numerot</h2>
      <PersonDisplay persons={persons}
        setPersons={setPersons}
        nameFilter={nameFilter}
        setMessage={setMessage}
        displayMessage= {displayMessage} />
    </div>
  )
}

const PersonDisplay = ({persons, setPersons, nameFilter, setMessage, displayMessage}) => {
  const deletePerson = (person) => {
    if (window.confirm(`Haluatko poistaa henkilön ${person.name}?`)) {
      personService
      .del(person.id)
      .then((response) => {
        setPersons(persons.filter(p => p.id !== person.id))
        displayMessage(`Henkilö ${person.name} poistettu.`, 3000, true)
      })
      .catch(error => {
        setPersons(persons.filter(p => p.id !== person.id))
        displayMessage(`Henkilö ${person.name} oli jo poistettu.`, 3000, false)
      })
    }
  }
  return persons
        .filter(person => person.name.toLowerCase().includes(nameFilter))
        .map(person =>
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person)}>Poista</button>
          </div>)}

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons, displayMessage}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addName = (event) => {
    if (newName === '') {
      return
    }
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(p => p.name === newName && p.number === newNumber)) {
      displayMessage(`${newName} on jo luettelossa.`, 3000, false)
    } else if (persons.some(p => p.name === newName)) {
      if (window.confirm(`${newName} on jo luettelossa. Korvataanko vanha numero uudella?`)) {
        const person = persons.find(p => p.name === newName)
        const updatedPerson = {...person, number: newNumber}
        personService
          .update(person.id, updatedPerson)
          .then((response) => {
            setPersons(persons.map(p => p.id === person.id ? updatedPerson : p))
            setNewName('')
            setNewNumber('')
            displayMessage(`Henkilön ${person.name} numero muutettu.`, 3000, true)
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== person.id))
            displayMessage(`Henkilö ${person.name} oli jo poistettu.`, 3000, false)
          })
      }
    } else {
      personService.create(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          displayMessage(`Henkilö ${response.data.name} lisätty.`, 3000, true)
        })
        .catch(error => {
          displayMessage(error.response.data.error, 5000, false)
        })
    }
  }
  return (
    <div>
      <form onSubmit={addName}>
        <div>
          nimi: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          numero: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  )
}

const Filter = ({nameFilter, setNameFilter}) => {
  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }
  return (
    <div>
      rajaa näytettäviä: <input value={nameFilter} onChange={handleFilterChange} />
    </div>
  )
}

const Notification = ({ message, success }) => {
  const successStyle = {
    "color": "green",
    "background": "lightgrey",
    "fontSize": "20px",
    "borderStyle": "solid",
    "borderRadius": "5px",
    "padding": "10px",
    "marginBottom": "10px"
  }
  const errorStyle = {
    "color": "red",
    "background": "lightgrey",
    "fontSize": "20px",
    "borderStyle": "solid",
    "borderRadius": "5px",
    "padding": "10px",
    "marginBottom": "10px"
  }

  if (message === null) {
    return null
  }

  if (success) {
    return (
      <div style={successStyle}>
        {message}
      </div>
    )
  }
  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}

export default App
