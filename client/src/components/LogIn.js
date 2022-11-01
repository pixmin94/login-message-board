import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import app from "../firebase";

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
        console.log(user)
    }
    else {
        setIsOpen(true)
    }
  }

  useEffect(() => {
    if (user) {
        setButton("Logout")
    }
  })

  return (
    <>
      <button onClick={buttonClick}>{button}</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>Login</Dialog.Title>
          <Dialog.Description>
            <form onSubmit={handleSubmit}>
              <label>
                Email:
                <input value={form.email} onChange={e => updateForm({email: e.target.value})}/>
              </label>
              <label>
                Password:
                <input type="password" value={form.password} onChange={e => updateForm({password: e.target.value})}/>
              </label>
              
              <input type="submit" value="Submit" />
            </form>
          </Dialog.Description>
          
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    </>

  )
}

export default Login;