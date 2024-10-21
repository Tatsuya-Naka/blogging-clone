import { db } from "~/server/db";
import EdittingTopicNotFound from "./not-found";
import EditTopicForm from "./edit-topic-form";

interface EditTopicFormProps {
    topicId: string;
    userId: string;
}

export default async function EditTopicFormPrep({topicId, userId}: EditTopicFormProps) {
    const topic = await db.topic.findFirst({
        where: {id: topicId},
        include: {
            tags: true,
        }
    });

    if (!topic) {
        return <EdittingTopicNotFound />
    }

    return (
        <EditTopicForm topic={topic} tags={topic.tags} />
    )
}