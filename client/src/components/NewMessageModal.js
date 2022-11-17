import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

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
      <button 
        class="button-navbar" 
        onClick={() => setIsOpen(true)}
      >
        New Message
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" class="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel class="w-full max-w-sm rounded bg-white">
                  <Dialog.Title
                    as="h3"
                    class="text-xl font-medium leading-6 text-gray-900 mt-2"
                  >
                    Add a new message
                  </Dialog.Title>
                  <div class="mt-3">    
                    <form class="text-m text-gray-500" onSubmit={handleSubmit}>
                      <input class="border rounded w-5/6 p-1" type="text" placeholder="Title" value={form.title} onChange={e => updateForm({title: e.target.value})}/>
                      <br/>
                      <textarea class="border rounded w-5/6 m-2 p-1" placeholder="Message" value={form.message} onChange={e => updateForm({message: e.target.value})}/>
                      <br/>
                      <input class="border rounded w-5/6 p-1" type="text" placeholder="Name" value={form.name} onChange={e => updateForm({name: e.target.value})}/>
                      <br/>
                      
                    
                      <input class="button-navbar" type="submit" value="Submit" />
                      <button class="button-navbar" onClick={() => setIsOpen(false)}>Cancel</button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>

  )
}

export default NewMessageModal;