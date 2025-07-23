require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()

let notes = []

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send( {error: 'Malformatted ID'} )
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json( {error: error.message} )
  }
  next(error)
  // else if (error.name == 'TypeError') {
  //   return response.status(400).send({error : 'Invalid Object ID'})
}


app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// Find all users within the DB
app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

// Find user by ID.
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
  .then((note) => {
    if(note) {
      response.json(note)
    }
    else {
      response.status(404).end()
    }
  })
  // Prints error via error handling middleware.
  .catch(error => next(error))
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  // Create a new note from the Note model: 
    // it's content is given in the request.body
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  // Save the new note and return it to the client in JSON format.
  note.save()
  .then((savedNote) => {
    response.json(savedNote)
  })
  .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
  .then(note => {
    console.log(`Removed ${note.content} from contacs.`)
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const {content, important} = request.body
  
  // Find the note with the ID given in request.
  Note.findById(request.params.id).then(note => {
    // Return error if not found.
    if(!note) {
      response.status(404).end()
    }

    // Update the note’s content and importance with values from the request body.
    note.content = content
    note.important = important

    // Save the updated note and return it in JSON format.
    note.save().then(updatedNote => {
      return response.json(updatedNote)
    })
  }).catch(error => next(error))  
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


// Middleware for after HTTP Routes have been defined:
app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})