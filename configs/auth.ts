import type { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import { Account, User as AuthUser } from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connect } from "@/utils/db"
import bcrypt from "bcryptjs";


export const authConfig: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials:{
                email: {label:"Email", type: "text"},
                password: {label: "Password", tyle:"text"},
            },
            async authorize(credentials:any) {
                await connect();
                try{
                    const user = await User.findOne({email: credentials.email})
                    if(user){
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        )
                        if(isPasswordCorrect){
                            return user;
                        }
                    }
                }catch(error:any){
                    throw new Error(error)
                }
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        })
    ]
}