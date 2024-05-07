import type { AuthOptions } from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import { cookies, headers } from "next/headers";

export const authConfig: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials:{
                email: {label:"Email", type: "text"},
                password: {label: "Password", type:"password"},
            },
            async authorize(credentials:any){
                try{
                    
                    const response = await fetch("http://127.0.0.1:3001/api/login",{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    credentials: "include",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                    
                    })
                    const data = await response.json()
                    console.log(data)
                    const cookiesStore = cookies()
                    cookiesStore.set("jwt", data.access_token, {
                        httpOnly:true,
                        sameSite:"none",
                        secure:true,
                        expires: data.expires
                    })
                    const token = cookiesStore.get("jwt")
                    console.log("COOKIE:", )
                    if(response.ok){
                        const userData = await fetch("http://127.0.0.1:3001/api/user",{
                            credentials:"include",
                            headers:{
                                Cookie: token?.name + "=" + token?.value,
                            }
                        })
                        const data = await userData.json()
                        console.log("DATA:", data)
                    }
                    const user = {
                        name: data.user.username,
                        email: data.user.email,
                    }
                    // .then(result => console.log(result))
                    return user as any;
                }catch(error: any){
                    throw new Error(error)
                }
            }
            // async authorize(credentials:any) {
            //     await connect();
            //     try{
            //         const user = await User.findOne({email: credentials.email})
            //         if(user){
            //             const isPasswordCorrect = await bcrypt.compare(
            //                 credentials.password,
            //                 user.password
            //             )
            //             if(isPasswordCorrect){
            //                 return user;
            //             }
            //         }
            //     }catch(error:any){
            //         throw new Error(error)
            //     }
            // },
        }),
    ]
}