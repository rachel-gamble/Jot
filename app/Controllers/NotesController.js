import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { notesService } from "../Services/NotesService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js";
import { saveState } from "../Utils/Store.js";
import { setHTML, setText } from "../Utils/Writer.js"


function _drawNotes() {
    let template = ''
    // let notes = appState.notes
    appState.notes.forEach(note => template += note.ListTemplate)
    setHTML('note-list', template)
    // setHTML('notes-form', Note.GetNewNoteTemplate())
    // setHTML('note-form', Note.GetNewNoteTemplate)
}

function _drawActiveNote() {
    let template = ''
    // setText("active-note", appState.activeNote)
    let active = appState.activeNote
    template += active.ActiveTemplate
    console.log('drawing active', active)
    // setHTML('active-note', template)
}

// function _drawActiveNote() {
// setHTML('details', appState.activeNote.ActiveTemplate)
// }

// function _drawListTemplate() {
//     let template = ''
// }


export class NotesController {

    constructor() {
        console.log("your note controller is working")
        appState.on('notes', _drawNotes)
        appState.on('activeNote', _drawActiveNote)
        _drawNotes()
    }

    setActive(noteId) {
        notesService.setActive(noteId)
        console.log('setting active', noteId)
        _drawNotes()
    }

    createNote() {
        //   let newNote = new Note(formdata)
        //   appState.notes = [...appState.notes, newNote]
        window.event.preventDefault()
        // saveState('notes', appState.notes)
        let form = window.event.target
        let formData = getFormData(form)
        console.log(formData);
        notesService.createNote(formData)
        this.setActive(noteId)
        form.reset()
        // _drawNotes()
    }
    // save note is working
    // saveNote() {
    //     window.event.preventDefault()
    //     let form = window.event.target.noteName.value
    //     // let newNote = document.querySelector('.note')
    //     let formData = getFormData(form)
    //     console.log(formData);
    //     notesService.saveNote(formData)
    //     // window.event.target.reset()
    // }

    async removeNote(noteId) {
        if (await Pop.confirm('Are you sure you want to delete this note?')) {
            notesService.removeNote(noteId)
        }
    }


    showNotes() {
        _drawNotes()
    }
}