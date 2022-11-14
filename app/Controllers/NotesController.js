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
    console.log('drawing active', template)
    setHTML('active-note', template)
}

// _draw notescount(){
// look at how many things are in the notes array in the appstate
// draw that number somewhere to the page
// }

export class NotesController {

    constructor() {
        _drawNotes()
        console.log("your note controller is working")
        appState.on('notes', _drawNotes)
        appState.on('activeNote', _drawActiveNote)
        _drawNotes()
        // draw notes count
        // draw notescount everytime notes changes
    }

    setActive(noteId) {
        // debugger
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
    saveNote() {
        // let form = window.event.target.noteName.value
        // let newNote = document.querySelector('.note')
        // let formData = getFormData(form)
        // window.event.target.reset()
        window.event.preventDefault()
        let note = document.getElementById('activeNote')
        console.log(note)
        // we want to send in the value of the textarea... send in the value of note
        notesService.saveNote(formData)
    }

    async removeNote(noteId) {
        if (await Pop.confirm('Are you sure you want to delete this note?')) {

            notesService.removeNote(noteId)
        }
    }


    showNotes() {
        _drawNotes()
    }
}