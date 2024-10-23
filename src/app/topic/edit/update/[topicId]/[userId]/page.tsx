import { Suspense } from "react";
import EditShowLoading from "~/component/edit-topic/edit-show-loading";
import EditTopicFormPrep from "~/component/edit-topic/edit-topic-form-prep";
import { HydrateClient } from "~/trpc/server";

interface EditTopicPageProps {
    params: {
        topicId: string;
        userId: string;
    }
}

export default async function EditTopicPage({ params }: EditTopicPageProps) {
    const { topicId, userId } = params;

    return (
        <HydrateClient>
            <div className="scroll-mt-14 bg-gray-200">
                <Suspense fallback={<EditShowLoading />}>
                    <EditTopicFormPrep topicId={topicId} />
                </Suspense>
            </div>
        </HydrateClient>
    )
}