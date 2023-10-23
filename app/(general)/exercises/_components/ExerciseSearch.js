import { Input } from "@nextui-org/input";
import { IconSearch } from "@tabler/icons-react";

export default function ExerciseSearch({ setSearchQuery }) {
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  return (
    <div className="col-span-1">
      <Input
        type="search"
        label="Search"
        startContent={
          <IconSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        onChange={handleSearchChange}
      />
    </div>
  );
}
