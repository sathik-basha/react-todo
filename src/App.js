import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {

  componentDidMount() {
    const addBtn = document.getElementById('add')
    const notes = JSON.parse(localStorage.getItem('notes'))
    if(notes) {
    notes.forEach(note => this.addNewNote(note))
    }
    addBtn.addEventListener('click', () => this.addNewNote())
  }

  addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = text

    deleteBtn.addEventListener('click', () => {
        note.remove()

       this.updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = value

        this.updateLS()
    })

    document.body.appendChild(note)
  }
  updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}

  render() {
    return (
      <button className="add" id="add">
      <i className="fas fa-plus"></i> Add note
    </button>
    )
  }
}

export default App;
