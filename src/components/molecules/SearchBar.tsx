import { type ChangeEventHandler } from "react";
import { Input } from "../ui/input";

type SearchBarProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
};

const SearchBar = ({ onChange, value }: SearchBarProps) => (
  <Input
    placeholder="Buscar..."
    type="text"
    onChange={onChange}
    value={value}
    className="border-0 bg-gray-50 shadow-sm"
  />
);

export default SearchBar;
