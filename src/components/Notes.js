import { React, useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export default function Notes(props) {
    const context = useContext(noteContext)
    const navigate = useNavigate()
    const { notes, getNotes, editNote } = context
    const ref = useRef(null)
    const refClose = useRef(null)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            navigate('/login')
        }
    })
    const [note, setNote] = useState({ etitle: "", edesc: "", etag: "" })
    const userName = localStorage.getItem('userName')

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        // console.log("Updating a note")
        editNote(note.id, note.etitle, note.edesc, note.etag)
        refClose.current.click()
        props.showAlert('Note updated successfully', 'success')
    }
    const updateNote = (currNote) => {
        ref.current.click()
        setNote({
            id: currNote._id,
            etitle: currNote.title,
            edesc: currNote.description,
            etag: currNote.tag
        })
    }
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3" style={{ "textAlign": "left" }}>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' onChange={onChange} minLength={3} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="desc" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edesc" value={note.edesc} name='edesc' onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" value={note.etag} name='etag' onChange={onChange} />
                                    </div>
                                </form>
                                <div className="modal-footer">
                                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button disabled={note.etitle.length < 3 || note.edesc.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3" style={{ "textAlign": "left" }}>
                <h1>Welcome, {userName}</h1>
                <h1>Your Notes</h1>
                <div className="conatiner mx-2">
                    {notes.lenght === 0 && 'No notes to display here, Add notes by clicking below'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />;
                })}
                <Link className='my-1' to="/addNote">
                    <button className="btn btn-success">Add Notes</button>
                </Link>
            </div>

        </>
    )
}
