import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '045-1234567' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(p => p.name === newName)) {
      window.alert(`${newName} on jo luettelossa.`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <div>
        rajaa näytettäviä: <input value={nameFilter} onChange={handleFilterChange} />
      </div>
      <form onSubmit={addName}>
        <h2>Lisää uusi</h2>
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
      <h2>Numerot</h2>
      {persons
        .filter(p => p.name.toLowerCase().includes(nameFilter))
        .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )

}

export default App
