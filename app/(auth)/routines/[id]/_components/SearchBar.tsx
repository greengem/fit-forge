import { ChangeEvent, FC, useState } from 'react';
import { Input } from "@nextui-org/input";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleSearch: () => void;
    setSearchResults: (results: any[]) => void;
    forwardedRef: React.RefObject<HTMLInputElement>;
}

export const SearchBar: FC<SearchBarProps> = ({ 
    searchTerm, 
    setSearchTerm, 
    handleSearch, 
    setSearchResults, 
    forwardedRef 
}) => {

    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        
        // Clear any previous timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        if (!term.trim()) {
            setSearchResults([]);
        } else {
            // Set a new timeout for the search
            const id = setTimeout(handleSearch, 300);
            setTimeoutId(id);
        }
    };    

    return (
        <Input
            
            type="search"
            name="search"
            placeholder="Search for Exercises"
            value={searchTerm}
            onChange={handleChange}
            ref={forwardedRef}
        />
    );
}
