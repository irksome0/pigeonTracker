"use server"

export const getUsers = async (token, mail) =>{
    console.log(mail, token)
    const userData = await fetch("http://127.0.0.1:3001/api/users",{
        method:"POST",
        headers:{
            "Cookie": `jwt=${token}`,
            "Content-Type": "application/json",
            "Vary": "Origin",
        },
        credentials: "include",
        body: JSON.stringify({
            email: mail,
        }),
    })
    const data = await userData.json()
    return data
}