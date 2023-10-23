import PageHeading from '@/components/PageHeading/PageHeading';
import {Spinner} from "@nextui-org/spinner";

export default function Loading() {
    return (
        <>
            <PageHeading title="Routines" />
            <div className="flex justify-center items-center h-screen w-full">
                <Spinner label="Loading..." color="success" />
            </div>
        </>
    )
}
