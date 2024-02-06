import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Candidate } from "../types";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export const Select = ({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: Candidate[];
    value: Candidate | null;
    onChange: (value: Candidate) => void;
}) => {
    const isSelected = (option: Candidate) => value?._id === option._id;

    return (
        <Listbox value={value} onChange={onChange}>
            {({ open }) => (
                <>
                    <Listbox.Label className='block text-sm font-medium leading-6 text-gray-900'>
                        {label}
                    </Listbox.Label>
                    <div className='relative mt-2'>
                        <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6'>
                            <span className='flex items-center'>
                                <span className='ml-3 block truncate'>
                                    {value ? value.name : "Select a candidate"}{" "}
                                    {/* Display placeholder or selected value */}
                                </span>
                            </span>
                            <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                                <ChevronUpDownIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                {options.map((option) => (
                                    <Listbox.Option
                                        key={option._id}
                                        className={({ active }) =>
                                            classNames(
                                                active
                                                    ? "bg-indigo-600 text-white"
                                                    : "text-gray-900",
                                                "relative cursor-default select-none py-2 pl-3 pr-9"
                                            )
                                        }
                                        value={option}
                                    >
                                        {({ active }) => (
                                            <div className='flex justify-between'>
                                                <span
                                                    className={classNames(
                                                        isSelected(option)
                                                            ? "font-semibold"
                                                            : "font-normal",
                                                        "block truncate flex-1"
                                                    )}
                                                    style={{ maxWidth: "75%" }}
                                                >
                                                    {option.name}
                                                </span>
                                                <span
                                                    className={classNames(
                                                        "text-gray-500",
                                                        "flex-none",
                                                        active
                                                            ? "text-white"
                                                            : "text-gray-500"
                                                    )}
                                                    style={{ width: "25%" }}
                                                >
                                                    ({option.votes} votes)
                                                </span>
                                            </div>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
};
