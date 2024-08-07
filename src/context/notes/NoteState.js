import { useState } from "react";
import NoteContext from "./noteContext";

const NoteStete = (props) => {
    const host = process.env.REACT_APP_API_LINK
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
        console.log("res",json);
        setNotes(json)
    }
    const addNote = async ({ title, description, tag }) => {
        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json()
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
    const editNote = async (id, title, description, tag) => {
        // API call
        // console.log("editing a note");

        // const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        // const json = await response.json()
        const newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client side
        for (let i = 0; i < newNotes.lenght; i++) {
            // let elem = newNotes[i];
            if (newNotes._id === id) {
                newNotes[i].title = title;
                newNotes[i].desc = description;
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