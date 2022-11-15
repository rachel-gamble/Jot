//!SECTION| This is done
import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js"
import { saveState } from "../Utils/Store.js";

class NotesService {

    createNote(formData) {
        let newNote = new Note(formData)
        appState.notes = [...appState.notes, newNote]
        // newNote.unlocked = true
        appState.activeNote = newNote
        saveState('notes', appState.notes)
        // console.log(newNote);
    }

    setActive(noteId) {
        console.log('set active service', name)
        let active = appState.notes.find(n => n.id == noteId)
        appState.activeNote = active
        console.log(appState.activeNote)
    }

    saveNote(newNote) {
        let activeNote = appState.activeNote
        activeNote.body = newNote
        activeNote.updated = new Date()
        // change the activeNote's updated time to be the current time : new Date()
        appState.emit('activeNote')
        // activeNote.currentDate = new Date()
        saveState('notes', appState.notes)
    }

    toggleVisibility() {
        let toggleElm = document.getElementById('toggleVisibility')
        if (toggleElm.style.visibility == "visible") {
            toggleElm.style.visibility = "hidden"
        } else {
            toggleElm.style.visibility = "visible"
        }
    }

    removeNote(noteId) {
        let filteredArray = appState.notes.filter(n => n.id != noteId)
        appState.notes = filteredArray
        appState.activeNote = null
        console.log('New array in AppState:', appState.notes);
        saveState('notes', appState.notes)
    }
}

export const notesService = new NotesService()