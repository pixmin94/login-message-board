import { useState } from 'react'
import { Dialog } from '@headlessui/react'

function NewMessageModal({ isOpen, setIsOpen }) {

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <Dialog.Title>Title</Dialog.Title>
        <Dialog.Description>
          Description
        </Dialog.Description>

        <p>
          Paragraph
        </p>

        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </Dialog.Panel>
    </Dialog>
  )
}


// function NewMessageModal(){
//     return (
//         <div id="myModal" class="modal">

//             <div class="modal-content">
//                 <span class="close">&times;</span>
//                 <p>Some text in the Modal..</p>
//             </div>

//         </div>
//     );
// }

export default NewMessageModal;