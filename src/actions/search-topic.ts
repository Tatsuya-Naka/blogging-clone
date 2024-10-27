"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import paths from "~/server/paths";

interface SearchTopicActionProps {
    errors: {
        term?: string[];
        _form?: string[];
    },
    success?: boolean;
};

const searchTopicActionSchema = z.object({
    term: z.string(),
});

export async function SearchTopicAction(formState: SearchTopicActionProps, formData: FormData): Promise<SearchTopicActionProps> {
    const query = searchTopicActionSchema.safeParse({
        term: formData.get("term")
    });

    if (!query.success) {
        return {
            errors: query.error.flatten().fieldErrors
        };
    }

    const {term} = query.data;

    revalidatePath(paths.searchPage(term));
    redirect(paths.searchPage(term));
}