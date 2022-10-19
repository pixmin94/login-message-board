import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Form } from 'react-router-dom';

function NewMessageModal({ isOpen, setIsOpen }) {
  const [message, setMessage] = useState()
  const [name, setName] = useState()

  function handleSubmit(event) {
    event.preventDefault()
    console.log(message)
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
                <textarea value={message} onChange={e => setMessage(e.target.value)}/>
              </label>
              <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
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