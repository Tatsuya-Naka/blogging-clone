
import CreateTopicForm from "~/component/create-topic/crate-topic.form";
import { HydrateClient } from "~/trpc/server";

export default async function CreateTopicPage() {
    return (
        <HydrateClient>
            <div className="scroll-mt-14 bg-gray-200">
                <CreateTopicForm />
            </div>
        </HydrateClient>
    )
}