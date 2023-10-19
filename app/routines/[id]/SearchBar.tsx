import { ChangeEvent, FC, useCallback } from 'react';

import {Input} from "@nextui-org/input";
interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleSearch: () => void;
    setSearchResults: (results: any[]) => void;
}

function debounce(fn: (...args: any[]) => void, delay: number): (...args: any[]) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return function(...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    }
}

export const SearchBar: FC<SearchBarProps> = ({ searchTerm, setSearchTerm, handleSearch, setSearchResults }) => {
    const debouncedSearch = useCallback(debounce(handleSearch, 300), [handleSearch]);
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (!term.trim()) {
            setSearchResults([]);
        } else {
            debouncedSearch();
        }
    };    

    return (
        <Input
            type="search"
            name="search"
            placeholder="Search for Exercises"
            value={searchTerm}
            onChange={handleChange}
        />
    );
}
