import { ChangeEvent, FC, useCallback } from 'react';

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
      <div className="flex items-center space-x-2">
          <input
              type="search"
              name="search"
              placeholder="search"
              value={searchTerm}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 w-full"
          />
      </div>
    );
}
