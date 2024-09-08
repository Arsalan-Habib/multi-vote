import React, { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Candidate } from "@/types";
import { CommentsModal } from "./ReviewsModal";

export function SelectWithSearch({
  title,
  placeholder,
  options,
  value,
  onChange,
}: {
  title: string;
  label?: string;
  placeholder?: string;
  options: Candidate[];
  value: Candidate | null;
  onChange: (value: Candidate) => void;
}) {
  const isSelected = (option: Candidate) => value?._id === option._id;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const initialFocusRef = useRef(null);

  const filteredOptions = options.filter((option) => option.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <label className="block pl-1 mb-1" htmlFor={"select" + title}>
        {title}
      </label>
      <button
        id={"select" + title}
        type="button"
        className={
          "w-full py-2 px-4 border rounded-md flex items-center justify-between " +
          (value ? "border-gray-500" : "border-gray-300")
        }
        onClick={() => setIsOpen(true)}
      >
        <p className={"truncate capitalize " + (value ? "text-gray-900 font-medium" : "text-gray-500 font-light")}>
          {value?.name || placeholder || "Select a candidate"}
        </p>
        <ChevronDownIcon className="h-5 w-5" />
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
              <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl h-[80vh] max-h-[600px]">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 text-center">
                  {title}
                </Dialog.Title>
                <XMarkIcon className="h-6 w-6 cursor-pointer absolute top-6 right-5" onClick={() => setIsOpen(false)} />

                <input
                  type="text"
                  className="my-4 w-full px-4 py-2 border border-gray-300 rounded-md 
                                    focus:ring-1 focus:ring-gray-600 focus:outline-none focus:border-transparent"
                  placeholder="Search for candidates by name"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />

                <div ref={initialFocusRef} className="mb-10 max-h-[80%] overflow-y-auto">
                  <ul>
                    {filteredOptions.map((candidate) => (
                      <li key={candidate._id}>
                        <button
                          className={
                            "px-2 py-3 flex items-start w-full justify-between text-left hover:bg-gray-100 border-b border-gray-300" +
                            (isSelected(candidate) ? " bg-gray-100" : "")
                          }
                          onClick={(e) => {
                            onChange(candidate);
                            setIsOpen(false);
                          }}
                        >
                          <div>
                            <p
                              className={
                                "text-md capitalize " + (isSelected(candidate) ? "font-semibold" : "font-normal")
                              }
                            >
                              {candidate.name}
                            </p>
                            <p className={"text-sm " + (isSelected(candidate) ? "font-normal" : "font-light")}>
                              Google sheets row #{candidate.googleSheetsRowNumber}
                            </p>
                          </div>
                          <div className="min-w-[120px]">
                            <p className="font-semibold text-gray-900 text-lg text-left">
                              {candidate.votes} <span className="font-normal text-sm">votes</span>
                            </p>
                            <CommentsModal comments={candidate.reviewComments} />
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
