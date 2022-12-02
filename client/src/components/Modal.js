import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

function Modal({ 
  isOpen, 
  setIsOpen,
  buttonClick,
  button,
  children }) {

  return (
    <>
      <button class="button-navbar" onClick={buttonClick}>{button}</button>
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
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>

  )
}

export default Modal;