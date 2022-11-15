import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"



export class Note {

  constructor(data) {
    this.id = generateId()
    this.name = data.name
    // this.color = data.color
    this.createdAt = new Date()
    this.body = data.body || 'Type your note here...'
    this.updated = data.updated || new Date().toLocaleString()
  }


  get ListTemplate() {
    return /*html*/`
    <div class="col-12 p-2 selectable d-flex flex-wrap" onclick="app.notesController.setActive('${this.id}')">
    <div class="row">
      <div class="col-1 bg"><i class="mdi mdi-music"></i>
      </div>
      <div class="col-4">${this.name}
      </div>
      <div class="col-5">
        <h6>${this.createdAt.toLocaleString()}</h6>
      </div>
    </div>
  </div>
        `
  }

  get ActiveTemplate() {
    return `
        <div class="col-7 d-flex flex-wrap p-2 main-body" id="exampleModalLabel"><h2>${this.name}</h2></div>
        <h6>Created: ${this.createdAt.toLocaleDateString()}</h6>
        <h6>Last Updated: ${this.updated.toLocaleString()}</h6>

        <div class="d-flex flex-wrap bg-dark text-primary p-2">
              <textarea class="form-control" rows="20" cols="25" id="open-note"
                name="" onblur="app.notesController.saveNote()">${this.body}</textarea>
        </div>
        <button type="" class="btn btn-success mt-3" onclick="app.notesController.saveNote()">Save</button>
        <button type="reset" class="btn btn-outline-danger mt-3" onclick="app.notesController.removeNote('${this.id}')">Delete</button>
        `
  }

  // get HomeTemplate() {
  //   return `
  //   <div class="col-7 d-flex flex-wrap p-2 main-body">Welcome to poet! Select or create a new note to begin</div>
  //   `

  // }

  // static GetNewNoteTemplate() {
  //   return /*html*/ `
  //       <form class="d-flex flex-wrap p-2" onsubmit="app.notesController.createNote()">
  //         <div class="form-floating mb-3 col-12">
  //           <input class="form-control w-100" required type="text" minlength="3" maxlength="15" row="20"
  //             id="note-name" placeholder="Enter title here" name="name">
  //           <label for="note-name">${this.name}</label>
  //         </div>
  //         <textarea class="form-control" rows="20" cols="25" placeholder="Note Body" id="note-body"
  //           name="note-body">${this.body}</textarea>
  //         <button type="save" class="btn btn-success mt-3">Save</button>
  //         <button type="reset" class="btn btn-outline-danger mt-3">Delete</button>
  //       </form>

  //           `
  // }
  // <form onsubmit="app.notesController.saveNote()">

  get ComputeDate() {
    let date = this.date
    // return (date.getMonth() +1) + '/' + (date.getDate()) + '/' + date.getFullYear()
    return this.date.toLocaleDateString('en-US', { weekday: "long", year: "numeric", month: "short", day: "numeric", seconds: "none" })
  }

  // get ComputeFullDate(){
  //   return this.date.toLocaleDateString('en-us', {weekday: "long", year:"numeric", month:"short", day:"numeric"})
  // }

  get ComputeQuantity() {
    let quantity = appState.notes.filter(q => q.id == this.id).length
    console.log('you have', quantity, this.id)
    return quantity
  }
}