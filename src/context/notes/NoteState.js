// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteStete = (props) => {
    const host = 'http://localhost:5000'
    let notesInit = []
    let [notes, setNotes] = useState(notesInit)

    // Add a note
    const getNotes = async () => {
        // API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json()
        // console.log(json);
        setNotes(json)
    }
    const addNote = async ({ title, desc, tag }) => {
        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, desc, tag })
        })
        const json = await response.json()
        // console.log("Adding a note");
        notes = notes.concat(json)
        setNotes(notes)
    }
    const deleteNote = async (id) => {
        // API call: No need to store response in delete request
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
    }
    const editNote = async (id, title, desc, tag) => {
        // API call
        // console.log("editing a note");

        // const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, desc, tag })
        })
        // const json = await response.json()
        const newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client side
        for (let i = 0; i < newNotes.lenght; i++) {
            // let elem = newNotes[i];
            if (newNotes._id === id) {
                newNotes[i].title = title;
                newNotes[i].desc = desc;
                newNotes[i].tag = tag;
                break
            }
        }
        setNotes(notes)
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteStete;