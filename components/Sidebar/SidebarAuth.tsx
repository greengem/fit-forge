import Form from "@/components/form";
import { Button } from "@nextui-org/button";

export default function SidebarAuth() {
    return (
        <div className="border-t-2 p-5">
            <Form action="/api/logout">
                <Button color="danger" type="submit" className="w-full">Sign out</Button>
            </Form>
        </div>
    )
}
