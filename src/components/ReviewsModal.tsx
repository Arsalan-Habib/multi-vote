import React, { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

export function CommentsModal({ comments }: { comments?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const initialFocusRef = useRef(null);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="text-xs underline flex items-center justify-center"
      >
        review comments <ArrowTopRightOnSquareIcon className="h-3 w-3 -mb-[2px]" />{" "}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
          initialFocus={initialFocusRef}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl h-[90vh] max-h-[600px]">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 text-center">
                  {"Reviewer's comments"}
                </Dialog.Title>
                <XMarkIcon
                  className="h-6 w-6 cursor-pointer absolute top-6 right-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                />

                <div
                  ref={initialFocusRef}
                  className="relative my-4 h-[90%] overflow-y-auto flex items-center justify-center"
                >
                  <p className=" text-gray-600 absolute top-0">{comments || "No comments."}</p>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
