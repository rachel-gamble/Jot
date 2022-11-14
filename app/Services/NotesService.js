//!SECTION| This is done
import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js"
import { saveState } from "../Utils/Store.js";

class NotesService {

    createNote(formData) {
        let newNote = new Note(formData)
        appState.notes = [...appState.notes, newNote]
        // newNote.unlocked = true
        // appState.activeNote = newNote
        saveState('notes', appState.notes)
        console.log(newNote);
    }

    setActive(name) {
        console.log('set active service', name)
        let active = appState.notes.find(n => n.name == name)
        appState.activeNote = active
        console.log(appState.activeNote)
    }

    saveNote(newNote) {
        let activeNote = appState.activeNote
        activeNote.unlocked = false
        activeNote.note = newNote
        appState.emit('activeNote')
        saveState('notes', appState.notes)
    }

    toggleVisibility(){
        let toggleElm = document.getElementById('toggleVisibility')
        if (toggleElm.style.visibility == "visible"){
            toggleElm.style.visibility = "hidden"
        } else {
            toggleElm.style.visibility = "visible"
        }
    }

    removeNote(note) {
        let filteredArray = appState.notes.filter(n => n.name != noteName)
        appState.notes.filteredArray
        console.log('New array in AppState:', appState.notes);
        saveState('notes', appState.notes)
    }
}

export const notesService = new NotesService()