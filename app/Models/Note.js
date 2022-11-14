// import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"



export class Note {

  constructor(data) {
    this.id = generateId()
    this.name = data.name
    // this.color = data.color
    this.createdAt = new Date()
    this.body = data.body
    // this.updated = data.updated
  }


  get ListTemplate() {
    return /*html*/`
    <div class="col-12 p-2 selectable d-flex flex-wrap" onclick="app.notesController.setActive('${this.iD}')">
    <div class="row">
      <div class="col-1"><i class="mdi mdi-music"></i>
      </div>
      <div class="col-4">${this.name}
      </div>
      <div class="col-5">
        <h6>${this.createdAt}</h6>
      </div>
      <button class="btn btn-success col-3" data-bs-toggle="modal" data-bs-target="#exampleModal">edit</button>
    </div>
  </div>
        `
  }

  get ActiveTemplate() {
    return /*html*/ `
        <div class="col-7 d-flex flex-wrap p-2" id="exampleModalLabel">${this.noteId}</div>
        <h5>${this.createdAt.toLocaleDateString()}</h5>
        <form class="d-flex flex-wrap bg-dark text-primary p-2" onsubmit="app.notesController.saveNote()">
              <textarea class="form-control" rows="20" cols="25" placeholder="Note Body" id="active-note"
                name="activeNote">${this.body}</textarea>
              <button type="save" class="btn btn-success mt-3" onclick="app.notesController.saveNote()">Save</button>
              <button type="reset" class="btn btn-outline-danger mt-3">Delete</button>
              </form>
        `    }

  static GetNewNoteTemplate() {
    return /*html*/ `
        <form class="d-flex flex-wrap p-2" onsubmit="app.notesController.createNote()">
          <div class="form-floating mb-3 col-12">
            <input class="form-control w-100" required type="text" minlength="3" maxlength="15" row="20"
              id="note-name" placeholder="Enter title here" name="name">
            <label for="note-name">${this.name}</label>
          </div>
          <textarea class="form-control" rows="20" cols="25" placeholder="Note Body" id="note-body"
            name="note-body">${this.body}</textarea>
          <button type="save" class="btn btn-success mt-3">Save</button>
          <button type="reset" class="btn btn-outline-danger mt-3">Delete</button>
          <form onsubmit="app.notesController.saveNote()">
          </form>
            `
  }

  get ComputeDate() {
    let date = this.date
    return this.date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
  }
}