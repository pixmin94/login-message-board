import React, { useState } from 'react';
import Modal from './NewMessageModal';
require('react-dom');
window.React2 = require('react');
console.log('new')
console.log(window.React1 === window.React2);

function NavBar() {
    let [isOpen, setIsOpen] = useState(true)
    // console.log(isOpen)

    return (
        <div>
            <h1>Forum</h1>
            <button>Login</button>
            <button>Register</button>
            <button>New Message</button>
            <Modal isOpen={true} setIsOpen={setIsOpen}/>
            
        </div>
    );
}



export default NavBar;