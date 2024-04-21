import User from "@/models/User"
import {connect} from "@/utils/db"
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const {nickname, email, password} = await request.json();

    await connect();

    const existingUser = await User.findOne({email});

    if(existingUser){
        return new NextResponse(
            "Email is already used",
            {status: 400},
        );
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
        nickname: nickname,
        email: email,
        password: hashedPassword,
    })

    try{
        await newUser.save();
        return new NextResponse(
            "User has been created!",
            {status: 200},
        );
    }catch(error: any){
        return new NextResponse(error, {
            status: 500,
        });
    }
}