import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import app from "../firebase";
import Modal from "./Modal"

function Login({ isOpen, setIsOpen, user }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [button, setButton] = useState("Login")
  const auth = getAuth(app);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function handleSubmit(e){
    e.preventDefault()
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed in 
        // const user = userCredential.user;
        setIsOpen(false);
        alert("signed in!")
        
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
    
  }

  function buttonClick() {
    if (user) {
        auth.signOut();
        setButton("Login")
        alert("Logged out!")
        window.location.reload();
    }
    else {
        setIsOpen(true)
    }
  }

  useEffect(() => {
    if (user) { setButton("Logout") }
  }, [user])

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        buttonClick={buttonClick}
        button={button}
      >
        
      <Dialog.Title class="text-xl font-medium leading-6 text-gray-900 mt-2">Login</Dialog.Title>
      <form class="mt-3" onSubmit={handleSubmit}>
          <input class="input-box" type="text" placeholder="Email" value={form.email} onChange={e => updateForm({email: e.target.value})}/>
          <input class="input-box m-2" type="password" placeholder="Password" value={form.password} onChange={e => updateForm({password: e.target.value})}/>
          
          <input class="button-navbar" type="submit" value="Submit" />
          <button class="button-navbar" type="button" onClick={() => setIsOpen(false)}>Cancel</button>
      </form>
        
      </Modal>
    </>

  )
}

export default Login;