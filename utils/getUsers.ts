"use server"

export const getUsers = async (token: string, email: string) =>{
    const userData = await fetch("http://127.0.0.1:3001/api/users",{
        method:"POST",
        headers:{
            "Cookie": `jwt=${token}`,
            "Content-Type": "application/json",
            "Vary": "Origin",
        },
        credentials: "include",
        body: JSON.stringify({
            email: email,
        }),
    })
    const data = await userData.json()
    return data
}