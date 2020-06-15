import React, { useState, useEffect } from 'react'
import Person from './Person'
import personService from './services/persons'

const Personform = ({addPerson, newName, newNum, handleNameChange, handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Number: <input value={newNum} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}

const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }
  const notificationStyle = {
    color: color,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: '5',
    padding: '10',
    fontSize: 20
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [notification, setNotification] = useState(null)
  const [ notificationColor, setNotificationColor ] = useState('green')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNum
    }
    if (persons.map(p => p.name).includes(newPerson.name)) {
      window.alert(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
      const replacedPerson = persons.find(p => p.name === newPerson.name)
      const id = replacedPerson.id
      personService
      .update(id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        setNotificationColor('green')
        setNotification(`Modified ${returnedPerson.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setNotificationColor('red')
        setNotification(`${replacedPerson.name} was already removed from server.`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
    } else {
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNum('')
        setNotificationColor('green')
        setNotification(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setNotificationColor('red')
        setNotification(`${error.response.data.error}`)
        console.log(error.response.data)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }

  const deletePerson = (id) => {
    const deletedPerson = persons.find(p => p.id === id)
    if (window.confirm(`Want to delete ${deletedPerson.name}?`)) {
      personService
     .deleteObject(id)
     .then(() => {
       setPersons(persons.filter(p => p.id !== id))
       setNotificationColor('green')
       setNotification(`Deleted ${deletedPerson.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
     })
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handlePersonsToShow = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => 
    person.name.toUpperCase().includes(filter.toUpperCase()))
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} color={notificationColor} />
        <div>
            Filter shown with <input onChange={handlePersonsToShow}/>
        </div>
      <h2>Add a new</h2>
      <Personform addPerson={addPerson} newName={newName} newNum={newNum}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => 
          <Person key={person.id} person={person} handleClick=
          {() => deletePerson(person.id)}/>
        )}
      </ul>
    </div>
  )

}

export default App