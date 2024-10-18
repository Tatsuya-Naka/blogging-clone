import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

type reqDataType = {
    username: string;
    email: string;
    password: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body = await req.json();
    const data = body.user as reqDataType;

    if (!data) {
        return NextResponse.json({error: "Invalid Request!"}, {status: 400});
    }
    const {username, email, password}: {username: string, email: string, password: string} = data;
    
    if (!username || !email || !password) {
        return NextResponse.json({error: "Missing username, email, or password!!"}, {status: 400});
    }
    const existUser = await db.user.findUnique({
        where: {email: email}
    });

    if (existUser) {
        return NextResponse.json({error: "User already exists"}, {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
        data: {
            name: username,
            email: email,
            password: hashedPassword,
        }
    });

    return NextResponse.json({message: "Success", user: {data: {name: username, email: email, password: password}}});
}