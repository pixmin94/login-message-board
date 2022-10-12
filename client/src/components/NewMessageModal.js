import { useState } from 'react'
import { Dialog } from '@headlessui/react'

function NewMessageModal() {
  let [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <Dialog.Title>Deactivate account</Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>

        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
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