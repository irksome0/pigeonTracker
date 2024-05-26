"use server"

import { useSessionStorage } from "./useSessionStorage";

export const checkAdmin = async (email) => {
    const token = useSessionStorage("jwt");
    const tokenValue = await token;
    const response = await fetch("http://127.0.0.1:3001/api/checkIfAdmin",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
            "Cookie": `jwt=${tokenValue.value}`
        },
        body: JSON.stringify({
            "email": email,
        })
    })
    return response?.ok ? true : false;
}