import React, { useEffect, useState } from 'react';
import NewMessage from './NewMessageModal';
import Register from './Register';
import Login from './LogIn';
import { getAuth } from 'firebase/auth'
import app from "../firebase";
import { Link } from 'react-router-dom';
require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);

function NavBar() {
    let [msgOpen, setMsgOpen] = useState(false)
    let [registerOpen, setRegisterOpen] = useState(false)
    let [loginOpen, setLoginOpen] = useState(false)
    let [user, setUser] = useState()
    
    // useEffect (()=> {
    //     const auth = getAuth(app);
    //     console.log(app)
    //     setUser(auth.currentUser);
    //     console.log(user)
    //     localStorage.setItem('user', JSON.stringify(user))
    // },[user])

    useEffect(() => {
        console.log("checking auth state in navbar")
        const auth = getAuth(app)
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            }
        })
    },[])

    return (
        <div class="flex justify-between bg-slate-50">
            <Link to="/login-message-board">
                <h1 class="p-2 m-1 text-3xl font-bold text-slate-500">Message Board</h1>
            </Link>
            <div class="flex justify-end">
                <Login isOpen={loginOpen} setIsOpen={setLoginOpen} user={user}/>
                <Register isOpen={registerOpen} setIsOpen={setRegisterOpen} user={user}/>
                <NewMessage isOpen={msgOpen} setIsOpen={setMsgOpen}/>
            </div>
        </div>
    );
}

export default NavBar;