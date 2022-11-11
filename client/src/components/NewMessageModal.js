import { useState } from 'react'
import { Dialog } from '@headlessui/react'

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
      <button class="button-navbar" onClick={() => setIsOpen(true)}>New Message</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>Add a new message</Dialog.Title>          
            <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input type="text" value={form.title} onChange={e => updateForm({title: e.target.value})}/>
            </label>
            <label>
              Message:
              <textarea value={form.message} onChange={e => updateForm({message: e.target.value})}/>
            </label>
            <label>
              Name:
              <input type="text" value={form.name} onChange={e => updateForm({name: e.target.value})}/>
            </label>
            
            <input type="submit" value="Submit" />
          </form>
          
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    </>

  )
}

export default NewMessageModal;