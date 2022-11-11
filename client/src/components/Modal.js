import { useState } from 'react'
import { Dialog } from '@headlessui/react'

function Modal({ isOpen, setIsOpen, children }) {

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{children.button}</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
            { children }
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    </>

  )
}

export default NewMessageModal;