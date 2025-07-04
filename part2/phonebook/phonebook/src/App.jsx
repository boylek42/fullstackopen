import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import axios from "axios"
import phoneFunction from './services/phone'
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    phoneFunction.getAll()
    .then(initialContacts => {
      setPersons(initialContacts)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterTerm, setNewFilter] = useState('')
  const [notificaiton, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const isExistingContact = (contacts, nameToCheck) => {
    return (contacts.some((contact) => contact.name === nameToCheck))
  }

  const resetInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  // If: contact already exists, update the existing.
      // HTTP POST: ID of existing contact, updatedContact.
  // Else: add the new contact.  
  const addContact = (e) => {
    e.preventDefault()

    // If newName exists already: make user confirm to change the number.
    if(isExistingContact(persons, newName)) {
      if(window.confirm(`${newName} is already added to Phonebook, replace the old number with the new one?`)) {
        const existingContact = persons.filter(person => person.name === newName)
        const requiredID = existingContact[0].id
        const newContact = {
          // id: existingContact[0].id,
          name: existingContact[0].name,
          number: newNumber.toString(),
        }

        console.log('New contact is: ', newContact)

        phoneFunction.updateContact(requiredID, newContact)
        .then((newContact) => {
          setPersons(persons.map((person) => person.id === requiredID ? newContact : person))
        })
        .catch(error => {
          setNotificationType("error")
          setNotification(`Information of ${newName} has already been deleted from the server.`)
          setTimeout(() => {
            setNotification(null)
          }, 2500)
        })
        console.log(requiredID)
      }
    }
    else {
      // newUser being added: following is the structure of the user object.
      const newNameObject = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString() 
      }
      phoneFunction.create(newNameObject)
      .then(newContact => {
        setPersons(persons.concat(newContact))
        resetInputs()
        setNotificationType("success")
        setNotification(`${newName} has been added.`)
        resetInputs()
        setTimeout(() => {
          setNotification(null)
        }, 2500)
      })
    }
  }

  const handleNewName = (e) => {
    console.log('Current target value', e.target.value)
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }

  const handleNewFilter = (e) => {
    console.log(e.target.value)
    setNewFilter(e.target.value)
  }

  const deleteContact = (id) => {
    if(window.confirm(`About to delete contact with ID: ${id}`)) {
      phoneFunction
      .remove(id)
      .then(() => {  
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificaiton} type={notificationType}/>
      <Filter filterTerm={filterTerm} handleNewFilter={handleNewFilter}/>
      <PersonForm addContact={addContact} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <ul>
        <Persons persons={persons} filterTerm={filterTerm} handleDelete={(id, contactName) => deleteContact(id, contactName)}/>
      </ul>
    </div>
  )
}

export default App