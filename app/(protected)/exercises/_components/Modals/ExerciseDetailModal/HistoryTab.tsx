'use client';
import { Card, CardBody, CardHeader } from "@nextui-org/card";

export default function HistoryTab() {
    return (
        <div className="space-y-3">
            <Card shadow="none" className="shadow-md ring-2 ring-zinc-800">
                <CardHeader className="flex-col items-start">
                    <h4 className="font-semibold text-lg">Name of Routine</h4>
                    <p className="text-sm text-zinc-500">Time, Day, 28 Aug 2024</p>
                </CardHeader>
                <CardBody>
                    <ul>
                    <li className="font-semibold flex justify-between">
                        <span>Sets Performed</span>
                        <span>1RM</span>
                    </li>

                    <li className="text-zinc-500 flex justify-between">
                        <span>1 100kg x 10</span>
                        <span>53</span>
                    </li>
                    <li className="text-zinc-500 flex justify-between">
                        <span>2 100kg x 10</span>
                        <span>53</span>
                    </li>
                    <li className="text-zinc-500 flex justify-between">
                        <span>3 100kg x 10</span>
                        <span>53</span>
                    </li>
                    <li className="text-zinc-500 flex justify-between">
                        <span>4 100kg x 10</span>
                        <span>53</span>
                    </li>
                    </ul>
                </CardBody>
            </Card>

            <Card shadow="none" className="shadow-md ring-2 ring-zinc-800">
                <CardHeader className="flex-col items-start">
                    <h4 className="font-semibold text-lg">Name of Routine</h4>
                    <p className="text-sm text-zinc-500">Time, Day, 28 Aug 2024</p>
                </CardHeader>
                <CardBody>
                    <ul>
                    <li className="font-semibold flex justify-between">
                        <span>Sets Performed</span>
                        <span>1RM</span>
                    </li>

                    <li className="text-zinc-500 flex justify-between">
                        <span>1 100kg x 10</span>
                        <span>53</span>
                    </li>
                    <li className="text-zinc-500 flex justify-between">
                        <span>2 100kg x 10</span>
                        <span>53</span>
                    </li>
                    <li className="text-zinc-500 flex justify-between">
                        <span>3 100kg x 10</span>
                        <span>53</span>
                    </li>
                    <li className="text-zinc-500 flex justify-between">
                        <span>4 100kg x 10</span>
                        <span>53</span>
                    </li>
                    </ul>
                </CardBody>
            </Card>
        </div>
    )
}