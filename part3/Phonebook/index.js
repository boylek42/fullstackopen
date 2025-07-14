const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
morgan.token('resBody', (request, response) => JSON.stringify(request.body))

  app.use(morgan((tokens, request, response) => {
  return[
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens['response-time'](request, response), 'ms',
    tokens.resBody(request, response)
  ].join(' ')
}))
// app.use(morgan("tiny"))



let contacts = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const getId = () => {
  return Math.floor(Math.random * 1000)
}

// Get Method - return contact list object
app.get('/api/persons', (request, response) => {
    response.json(contacts)
})

// Get Method - return information regarding contact list
app.get('/api/info', (request, response) => {
    const contactListSize = contacts.length
    const requestTime = Date()
    response.send(
      '<p>Phonebook has info for ' + contactListSize +  ' people. </p>' + 
      '<p>' + requestTime +  '</p>'
    )
})

// Get Method - return individual contact details.
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const contact = contacts.find(contact => contact.id === id)

    if(!contact) {
      response.status(404).end()
    }
    response.json(contact)
})

// Delete Method - delete an individual contact
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    contacts = contacts.filter(contact => contact.id !== id)

    response.status(204).end()
})

// Post Method - Add new contact
app.post('/api/persons/', (request, response) => {
    const contact = request.body
    contact.id = String(Math.floor(Math.random() * 1000))
    
    if(!contact.name || !contact.number) {
      console.log("error: Object has no value for 'name' / 'number'.")
      return response.status(400).end()
    }
    else if (contacts.some(c => c.name === contact.name)) {
      console.log("error: Name already exists in contacts.")
      return response.status(400).end()
    }
    return response.json(contact)
  })





const PORT = 3001
app.listen(PORT, () => {
    console.log('Now listening on port: ', PORT)
})