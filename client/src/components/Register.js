import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import app from "../firebase";
import Modal from "./Modal"

function Register({ isOpen, setIsOpen, user }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [formError, setFormError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [button, setButton] = useState("Register")

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    })
  }

  async function validateInput(e) {
    e.preventDefault();
    let inputError = {
      email: "",
      password: "",
      confirmPassword: "",
    }

    if (!form.email && !form.password) {
      setFormError({
        ...inputError,
        email: "Enter valid email address",
        password: "Password should not be empty",
      })
      return
    }

    if (!form.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {
      setFormError({
        ...inputError,
        email: "Enter valid email address",
      })
      return
    }

    if (form.confirmPassword !== form.password) {
      setFormError({
        ...inputError,
        confirmPassword: "Password and confirm password should be same",
      })
      return
    }

    if (!form.password) {
      setFormError({
        ...inputError,
        password: "Password should not be empty",
      })
      return
    }
    setFormError(inputError);
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
      })
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
      <form class="mt-3" onSubmit={validateInput}>
          <input class="input-box" type="text" placeholder="Email" value={form.email} onChange={e => updateForm({email: e.target.value})}/>
          <p>{formError.email}</p>
          <input class="input-box m-2" type="password" placeholder="Password" value={form.password} onChange={e => updateForm({password: e.target.value})}/>
          <p>{formError.password}</p>
          <input class="input-box" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={e => updateForm({confirmPassword: e.target.value})}/>
          <p>{formError.confirmPassword}</p>

          <input class="button-navbar" type="submit" value="Submit" />
          <button class="button-navbar" type="button" onClick={() => setIsOpen(false)}>Cancel</button>
      </form>
        
      </Modal>
    </>

  )
}

export default Register;