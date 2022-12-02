import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import app from "../firebase";
import Modal from "./Modal"

function Register({ isOpen, setIsOpen, user }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [button, setButton] = useState("Register")

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function handleSubmit(e){
    e.preventDefault()
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("signed in!")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
  }

  function buttonClick() {
    if (user) {
        console.log("navigate to account page here")
    }
    else {
        setIsOpen(true)
    }
  }

  useEffect(() => {
    // console.log("checking user in login")
    if (user) { setButton("Account") }
  }, [user])

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        buttonClick={buttonClick}
        button={button}
      >
        
      <Dialog.Title class="text-xl font-medium leading-6 text-gray-900 mt-2">Register</Dialog.Title>
      <form class="mt-3" onSubmit={handleSubmit}>
          <input class="input-box" type="text" placeholder="Email" value={form.email} onChange={e => updateForm({email: e.target.value})}/>
          {/* <input class="input-box" type="password" placeholder="Password" value={form.password} onChange={e => updateForm({password: e.target.value})}/> */}
          <input class="input-box m-2" type="password" placeholder="Confirm Password" value={form.password} onChange={e => updateForm({password: e.target.value})}/>
          
          <input class="button-navbar" type="submit" value="Submit" />
          <button class="button-navbar" type="button" onClick={() => setIsOpen(false)}>Cancel</button>
      </form>
        
      </Modal>
    </>

  )
}

export default Register;