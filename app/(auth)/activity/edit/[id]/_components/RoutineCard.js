import RoutineTable from './RoutineTable';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Button } from '@nextui-org/button';
import { IconPlus, IconX } from '@tabler/icons-react';

export default function RoutineCard({ exercise }) {
    return (
      <Card>
        <CardHeader className="font-semibold text-xl px-5">{exercise.Exercise.name}</CardHeader>
        <CardBody>
          <RoutineTable exercise={exercise} />
        </CardBody>
        <CardFooter className="gap-2 px-5">
          <Button className="gap-unit-1" size="sm">
            <IconPlus size={16} />
            Add Set
          </Button>
          <Button className="gap-unit-1" size="sm">
            <IconX size={16} />
            Remove Set
          </Button>
        </CardFooter>
      </Card>
    );
  }
  