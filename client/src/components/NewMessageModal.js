import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import Modal from './Modal'

function NewMessageModal({ isOpen, setIsOpen }) {
  const [form, setForm] = useState({
    title: "",
    message: "",
    name: ""
  })

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  

  async function handleSubmit(event) {
    event.preventDefault()
    const newMessage = { ...form };
 
    await fetch("https://forum-backend.onrender.com/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
  
    setForm({ title: "", message: "", name: "" });
    setIsOpen(false);
    window.location.reload();
  }

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        buttonClick={() => setIsOpen(true)}
        button="New Message"
      >
        
        <Dialog.Title class="text-xl font-medium leading-6 text-gray-900 mt-2">
          Add a new message
        </Dialog.Title> 
        <form class="mt-3" onSubmit={handleSubmit}>
          <input class="input-box" type="text" placeholder="Title" value={form.title} onChange={e => updateForm({title: e.target.value})}/>
          <textarea class="input-box m-2" placeholder="Message" value={form.message} onChange={e => updateForm({message: e.target.value})}/>
          <input class="input-box" type="text" placeholder="Name" value={form.name} onChange={e => updateForm({name: e.target.value})}/>
          
          <input class="button-navbar" type="submit" value="Submit" />
          <button class="button-navbar" type="button" onClick={() => setIsOpen(false)}>Cancel</button>
        </form>
        
      </Modal>
    </>

  )
}

export default NewMessageModal;

