import React, { useEffect, useState } from 'react';
import Modal from './NewMessageModal';
import Register from './Register';
import Login from './LogIn';
import { getAuth } from 'firebase/auth'
import app from "../firebase";
require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);

function NavBar() {
    let [msgOpen, setMsgOpen] = useState(false)
    let [registerOpen, setRegisterOpen] = useState(false)
    let [loginOpen, setLoginOpen] = useState(false)
    let [user, setUser] = useState()
    
    useEffect (()=> {
        const auth = getAuth(app);
        setUser(auth.currentUser);
        console.log(user)
    })

    return (
        <div>
            <h1>Forum</h1>
            <Login isOpen={loginOpen} setIsOpen={setLoginOpen} user={user}/>
            <Register isOpen={registerOpen} setIsOpen={setRegisterOpen} user={user}/>
            {/* <button>New Message</button> */}
            <Modal isOpen={msgOpen} setIsOpen={setMsgOpen}/>
            
        </div>
    );
}

export default NavBar;