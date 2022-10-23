import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Form } from 'react-router-dom';

function NewMessageModal({ isOpen, setIsOpen }) {
  const [form, setForm] = useState({
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
 
    await fetch("http://localhost:3001/record/add", {
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
  
    setForm({ message: "", name: "" });
    setIsOpen(false);
    window.location.reload();
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>New Message</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>Add a new message</Dialog.Title>
          <Dialog.Description>
            <form onSubmit={handleSubmit}>
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
          </Dialog.Description>
          
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    </>

  )
}

export default NewMessageModal;