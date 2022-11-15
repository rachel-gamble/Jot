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
    // if(appState.activeNote = null){
    //     setHTML('choose a note')
    // }
    // else {
    //    setHTML('active-note', activeNote.ActiveTemplate)
    // }
    let activeNote = appState.activeNote
    console.log('drawing active', activeNote)
    setHTML('active-note', activeNote.ActiveTemplate)
}

function _drawQuantity() {
    let notes = appState.notes
    setText('quantity', notes.length)

    // look at how many things are in the notes array in the appState
    // draw that number somewhere to the page
}

export class NotesController {

    constructor() {
        _drawNotes()
        console.log("your note controller is working")
        appState.on('notes', _drawNotes)
        appState.on('activeNote', _drawActiveNote)
        _drawNotes()
        _drawQuantity()
        appState.on('notes', _drawQuantity)
        // draw notes count
        // draw notescount everytime notes changes
    }

    setActive(noteId) {

        console.log('setting active', noteId)
        notesService.setActive(noteId)
        // _drawNotes()
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
        // this.setActive(noteId)
        form.reset()
        // _drawNotes()
    }

    addQuantity() {
        console.log('adding note');
        notesService.addQuantity()
    }

    // save note is working

    async removeNote(noteId) {
        if (await Pop.confirm('Are you sure you want to delete this note?')) {

            notesService.removeNote(noteId)
        }
    }
    saveNote() {
        // let form = window.event.target.noteName.value
        // let newNote = document.querySelector('.note')
        // let formData = getFormData(form)
        // window.event.target.reset()
        // window.event.preventDefault()
        let newNote = document.getElementById('open-note')
        // let newNote = document.querySelector('.body')
        // we want to send in the value of the textarea... send in the value of note
        console.log(newNote.value, 'note body');
        notesService.saveNote(newNote.value)
    }


    showNotes() {
        _drawNotes()
    }
}