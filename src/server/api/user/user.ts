"use server";
import type { User } from "@prisma/client";
import { db } from "~/server/db";

interface userProps {
    id: string;
}

export async function userInfo(id: string): Promise<User> {
    const user = await db.user.findUnique({
        where: {id: id}
    });

    return user as User;
}