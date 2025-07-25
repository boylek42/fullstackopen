require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express()

const errorHandler = (error, request, response, next) => {
  console.error(`${error} is the error.`)

  if (error.name === 'CastError') {
    return response.status(400).send(  { error: 'Malformatted ID - ID does not exist' })
  }
  else if(error.name === 'ValidationError') {
    return response.status(400).json( { error: 'Validation Error - Invalid Object ID' })
  }
  next(error)
}

app.use(express.json())
app.use(express.static('dist'))

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)

const contactSchema = new mongoose.Schema({
  'name': {
    type: String,
    minLength: 3 },
  'number': {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d{3}-\d{4}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number.`
    },
    required: [true, 'User phone number required']
  },
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Contact = mongoose.model('Contact', contactSchema)

morgan.token('resBody', (request) => JSON.stringify(request.body))
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

let contacts = []

// Get Method - return contact list object
app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contact => {
    response.json(contact)
  })
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
app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      response.json(contact)
    })
    .catch(error => next(error))
})

// Delete - delete an individual contact
app.delete('/api/persons/:id', (request, response, next) => {
  console.log(request.params.id)
  Contact.findByIdAndDelete(request.params.id).then(contact => {
    if(!contact) {
      console.log(`Error: no contact with id: ${request.params.id}`)
      return response.status(404).send({ error: 'contact not found' })
    }

    response.status(204).end()
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Contact.findById(request.params.id).then(contact => {
    if(!contact) {
      console.log(`No contact exists with id: ${request.params.id}`)
      response.status(404).end()
    }

    contact.name = name
    contact.number = number

    contact.save().then(updatedNote => {
      console.log(`Made an update to ${updatedNote.name}`)
      response.json(updatedNote)
    })
  }).catch(error => next(error))
})

// Post Method - Add new contact
app.post('/api/persons/', (request, response, next) => {
  const body = request.body
  console.log(`Body of request is: ${body}`)

  if(!body.name) {
    return response.status(400).json('Missing body in request.')
  }

  const contact = new Contact({
    name: body.name,
    number: body.number || false
  })

  contact.save().then(savedContact => {
    response.json(savedContact)
  }).catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`)
})