import React, { useState, useEffect } from 'react'
import personService from '../services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
    }, [])
  return (
    <div>
      <h1>Puhelinluettelo</h1>

      <h2>Hakurajaus</h2>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />

      <h2>Lisää uusi</h2>
      <PersonForm newName={newName} setNewName={setNewName}
                  newNumber={newNumber} setNewNumber={setNewNumber}
                  persons={persons} setPersons={setPersons} />

      <h2>Numerot</h2>
      <PersonDisplay persons={persons} setPersons={setPersons} nameFilter={nameFilter}/>
    </div>
  )
}

const PersonDisplay = ({persons, setPersons, nameFilter}) => {
  const deletePerson = (person) => {
    if (window.confirm(`Haluatko poistaa henkilön ${person.name}?`)) {
      personService.del(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }
  return persons
        .filter(person => person.name.toLowerCase().includes(nameFilter))
        .map(person =>
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person)}>Poista</button>
          </div>)}

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(p => p.name === newName && p.number === newNumber)) {
      window.alert(`${newName} on jo luettelossa.`)
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
          })
      }
    } else {
      personService.create(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data))
        })
      setNewName('')
      setNewNumber('')
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

export default App
