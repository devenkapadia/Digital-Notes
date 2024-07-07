import { useState } from "react"
import React from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {
    const host = process.env.REACT_APP_API_LINK
    const navigate = useNavigate()
    const [cred, setCred] = useState({ name: "", email: "", password: "", cpassword: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password })
        })
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            //redirect 
            props.showAlert("Account created!!",'success')
            navigate('/login')
        }
        else {
            props.showAlert("User already exists",'danger')
        }
    }
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
            <div className="container my-3" style={{ "textAlign": "left" }}>
            <h4 className="my-2">Create account to continue writing!!</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="name" className="form-control" id="name" name='name' autoComplete="on" onChange={onChange} minLength={3} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' autoComplete="on" onChange={onChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' autoComplete="on" onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" name='cpassword' autoComplete="on" onChange={onChange} minLength={5} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
    )
}

export default Signup
