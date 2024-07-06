import { useState } from 'react'
import { React, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const navigate = useNavigate()
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const clickHandler = (e) => {
        e.preventDefault();
        addNote(note)
        navigate('/')
        props.showAlert('Note added successfully', 'success')
    }
    return (
        <>
            <div className="container my-3" style={{ "textAlign": "left" }}>
                <h1>Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' onChange={onChange} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                    </div>
                    <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={clickHandler}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
