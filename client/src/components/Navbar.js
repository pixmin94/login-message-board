import React, { useState } from 'react';
import Modal from './NewMessageModal';
import Register from './Register';
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

function NavBar() {
    let [msgOpen, setMsgOpen] = useState(false)
    let [registerOpen, setRegisterOpen] = useState(false)

    return (
        <div>
            <h1>Forum</h1>
            <button>Login</button>
            <Register isOpen={registerOpen} setIsOpen={setRegisterOpen} />
            {/* <button>New Message</button> */}
            <Modal isOpen={msgOpen} setIsOpen={setMsgOpen}/>
            
        </div>
    );
}



export default NavBar;