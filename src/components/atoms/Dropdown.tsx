import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { Fragment } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "~/utils";

type DropdownProps = {
  options: string[];
  value: string | string[];
  multiple: boolean;
  onChange: (value: string | string[]) => void;
  placeholder?: string;
};

const Dropdown = ({
  options,
  value,
  multiple,
  onChange,
  placeholder,
}: DropdownProps) => (
  <div className="relative h-full w-full">
    <Listbox value={value} onChange={onChange} multiple={multiple}>
      <Listbox.Button className="relative flex h-full w-full cursor-pointer items-center rounded-md bg-gray-50 ps-2 text-left shadow-sm">
        {value.length > 0 ? (
          <p className="w-10/12 truncate text-sm">
            {typeof value === "string" ? value : value.join(", ")}
          </p>
        ) : (
          <p className="text-sm opacity-50">{placeholder}</p>
        )}

        <ChevronDownIcon
          className="absolute right-0 h-6 w-6 opacity-50"
          aria-hidden="true"
        />
      </Listbox.Button>

      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute z-10 mt-1 w-full rounded-md bg-gray-50 shadow-sm focus:outline-none">
          <ScrollArea
            className={cn("h-64 w-full", options.length > 6 ? "h-64" : "h-fit")}
          >
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
          </ScrollArea>
        </Listbox.Options>
      </Transition>
    </Listbox>
  </div>
);

export default Dropdown;
