import { useId } from "react";
import { SearchIcon } from "../Icons";
import cls from "./SearchInput.module.css";

export const SearchInput = ({ value, onChange }) => {
    const inputID = useId();

    return (
    <div className={cls.inputContainer}> 
          <label htmlFor={inputID}>
            <SearchIcon className={cls.searchIcon} />
            </label>
          <input type="text" id={inputID} className={cls.input} placeholder="search..." value={value} onChange={onChange} />
       </div>
    );
};
