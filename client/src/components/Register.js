import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import app from "../firebase";

function Register({ isOpen, setIsOpen }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

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
        console.log(form.email)
        console.log(user)
        alert("signed in!")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
    
  }

  

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Register</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>Register</Dialog.Title>
          <Dialog.Description>
            <form onSubmit={handleSubmit}>
              <label>
                Email:
                <input type="text" value={form.email} onChange={e => updateForm({email: e.target.value})}/>
              </label>
              {/* <label>
                Password:
                <input type="text" value={password} onChange={}/>
              </label> */}
              <label>
                Confirm Password:
                <input type="text" value={form.password} onChange={e => updateForm({password: e.target.value})}/>
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

export default Register;