import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { Fragment } from "react";

type DropdownProps = {
  options: string[];
  value: string | string[];
  multiple: boolean;
  onChange: (value: string | string[]) => void;
};

const Dropdown = ({ options, value, multiple, onChange }: DropdownProps) => (
  <div className="relative h-full w-full">
    <Listbox value={value} onChange={onChange} multiple={multiple}>
      <Listbox.Button className="relative flex h-full w-full cursor-pointer items-center rounded-md bg-gray-50 px-2 text-left shadow-sm">
        <p className="w-10/12 truncate text-sm">
          {typeof value === "string" ? value : value.join(", ")}
        </p>

        <ChevronDownIcon className="h-6 w-6 opacity-50" aria-hidden="true" />
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute z-10 mt-1 w-full rounded-md bg-gray-50 shadow-sm focus:outline-none">
          {options.map((option, index) => (
            <Listbox.Option
              key={index}
              value={option}
              className={({ active }) =>
                `data-[disabled] :pointer-events-none relative flex select-none items-center rounded-md p-2 text-sm outline-none hover:cursor-pointer hover:text-accent-foreground data-[disabled]:opacity-50 ${
                  active ? "bg-gray-100" : "bg-gray-50"
                }`
              }
            >
              {({ selected }) => (
                <div className="flex items-center">
                  {selected && <CheckIcon className="h-4 w-4" />}

                  <span className="font-normal">{option}</span>
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  </div>
);

export default Dropdown;
