"use server"

import { useSessionStorage } from "./useSessionStorage";

export const deleteUser = async (email:string, currentUserEmail:string) => {
    const token = useSessionStorage();
    const tokenValue = await token;
    await fetch("http://127.0.0.1:3001/api/delete",{
        method:"POST",
        credentials: "include",
        headers:{
            "Cookie": `jwt=${tokenValue?.value}`,
            "Content-Type": "application/json",
        },
        // here i did't want to rewrite neither backend nor front
        // backend uses email as middleware check
        // middleware checks whether user is admin
        // targetEmail - email of user we try to delete
        body: JSON.stringify({
            "email": currentUserEmail,
            "targetEmail": email
        }),
    })
}