import { Suspense } from "react";
import TopicWithBg from "./topic-with-bg";
import Ad1 from "./advertisement1";
import Ad2 from "./advertisement2";
import TopicLists from "./topic-lists";

export default async function HomeLists() {
    return (
        <div className="">
            <Suspense fallback={"Loading..."}>
                {/* Advertisement 1 */}
                <Ad1 />
                {/* Topic with background picture */}
                <TopicWithBg />
                {/* Advertisement 2 */}
                <Ad2/>
                {/* Topic lists */}
                <TopicLists />
            </Suspense>
        </div>
    )
}