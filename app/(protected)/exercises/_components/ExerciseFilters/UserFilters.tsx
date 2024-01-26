import { Card, CardBody } from "@nextui-org/card";
import {CheckboxGroup, Checkbox} from "@nextui-org/checkbox";

interface UserFiltersProps {
    setFilterByFavorites: (value: boolean) => void;
    setFilterByEquipment: (value: boolean) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({ setFilterByFavorites, setFilterByEquipment }) => {
    return (
        <Card className="mb-3">
            <CardBody>
                <CheckboxGroup orientation="horizontal" color="primary" size='sm'>
                    <Checkbox 
                        value="myFavorites"
                        onValueChange={setFilterByFavorites}
                    >
                        Favorites
                    </Checkbox>
                    <Checkbox 
                        value="myEquipment"
                        onValueChange={setFilterByEquipment}
                    >
                        My Equipment
                    </Checkbox>
                </CheckboxGroup>
            </CardBody>
        </Card>
    )
}

export default UserFilters;
