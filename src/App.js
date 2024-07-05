import './App.css';
import Home from './components/Home';
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from './context/notes/NoteState'
import AddNote from '../src/components/AddNote'
import Alert from '../src/components/Alert'
// import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState()
  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  const token = localStorage.getItem('token')
  return (
    <>
      <div className="App">
        <NoteState>
          <Router>
            <Navbar />
            <Alert alert={alert} />
            <div className="container my-8">
              <Routes>
                <Route exact path="/" element={token ? <Home showAlert={showAlert} /> : <Login showAlert={showAlert} />}>
                </Route>
                <Route exact path="/about" element={<About />}>
                </Route>
                <Route exact path="/addNote" element={<AddNote showAlert={showAlert} />}>
                </Route>
                <Route exact path="/login" element={<Login showAlert={showAlert} />}>
                </Route>
                <Route exact path="/signup" element={<Signup showAlert={showAlert} />}>
                </Route>
              </Routes>
            </div>
          </Router>
        </NoteState>
      </div>
    </>
  );
}

export default App;
