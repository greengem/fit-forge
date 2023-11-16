import { Input } from "@nextui-org/input";
import { IconSearch } from "@tabler/icons-react";

interface ExerciseSearchProps {
  setSearchQuery: (query: string) => void;
}

export default function ExerciseSearch({ setSearchQuery }: ExerciseSearchProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  return (
    <div className="col-span-1">
      <Input
        type="search"
        label="Search"
        placeholder="Squat"
        size="sm"
        onChange={handleSearchChange}
      />
    </div>
  );
}
