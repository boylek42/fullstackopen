import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import './index.css'

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important}

    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id === id ? returnedNote : note))
    })
    .catch(error => {
      setErrorMessage(
        `The note: '${note.content}' was already deleted from the server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 2500)
      setNotes(notes.filter(note => note.id !== id))
    })
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService
    .create(noteObject)
    .then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  // If notes is falsey (null is falsey)
  // don't render anything
  if (!notes) {
    return null}

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
          key={note.id} 
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App