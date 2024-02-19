'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Checkbox } from "@nextui-org/checkbox";

export default function ExerciseFilterUserEquipment() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleFilterUserEquipment(event: React.ChangeEvent<HTMLInputElement>) {
        const isFavourite = event.target.checked;
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (isFavourite) {
            params.set('equipmentOwned', 'true');
        } else {
            params.delete('equipmentOwned');
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    
    return (
        <Checkbox 
            size="sm" 
            onChange={handleFilterUserEquipment}
            defaultSelected={searchParams.get('equipmentOwned') === 'true'}
        >
            Exercises with my equipment
        </Checkbox>
    )
}