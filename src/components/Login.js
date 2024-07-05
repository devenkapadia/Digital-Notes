import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const host = 'http://localhost:5000'
    const navigate = useNavigate()
    const [cred, setCred] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        })
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //redirect 
            props.showAlert("Logged in successfully",'success')
            localStorage.setItem('token', json.authToken)
            navigate('/')
        }
        else {
            props.showAlert("Invalid credentials",'danger')
        }
    }
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <div className="container mt-3" style={{ "textAlign": "left" }}>
            <h4 className='my-2'>Login to continue writing!!</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={cred.email} autoComplete="on" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={cred.password} autoComplete="on" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
