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
      <PersonDisplay persons={persons} nameFilter={nameFilter}/>
    </div>
  )
}

const PersonDisplay = ({persons, nameFilter}) => persons
        .filter(p => p.name.toLowerCase().includes(nameFilter))
        .map(person => <p key={person.name}>{person.name} {person.number}</p>)

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
    if (persons.some(p => p.name === newName)) {
      window.alert(`${newName} on jo luettelossa.`)
    } else {
      setPersons(persons.concat(personObject))
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
