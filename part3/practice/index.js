const express =  require('express')
const app = express()

// Middleware: Static - serve static files such as HTML, CSS, JS files and images in Express.
//     - Now, whenever Expess receives a GET request it will check if the dist directory contains a 
//       corresponding file - if so - it will return it.
app.use(express.static('dist'))

app.use(express.json())

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },

    {
        id: "2",
        content: "CSS is medium",
        important: false
    },

    {
        id: "3",
        content: "JS is tough",
        important: true
    },
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    if(note) {
        response.json(note)   
    }
    else {
        response.statusMessage = "Note does not exist"
        response.status(404).end()
    }
})

// Delete an existing note using the HTML DELETE Method
app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(note => Number(note.id)))
        : 0

        console.log(maxId)
        return String(maxId + 1)
}

// Create new note using the HTML POST Method
app.post('/api/notes', (request, response) => {
    const body = request.body

    // Calling return here is crucial, if we don't the empty note still get's
    // added as the rest of this route executes.
    if (!body.content) {
        return response.status(404).json({
            error: 'Content Missing!'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: String(generateId(notes))
    }

    // notes = notes.concat(note)
    response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`)
})