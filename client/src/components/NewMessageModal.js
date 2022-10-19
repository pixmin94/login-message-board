import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Form } from 'react-router-dom';

function NewMessageModal({ isOpen, setIsOpen }) {

  return (
    <>
      <button onClick={() => setIsOpen(true)}>New Message</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>Add a new message</Dialog.Title>
          <Dialog.Description>
            <form>
              <label>
                Message:
                <textarea />
              </label>
              <label>
                Name:
                <input type="text"/>
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