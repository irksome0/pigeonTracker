"use server"

export const getUsers = async (token, email) =>{
    const userData = await fetch("http://127.0.0.1:3001/api/users",{
        method:"POST",
        headers:{
            "Cookie": `jwt=${token}`,
            "Content-type": "application/json", 
            "Vary": "origin",
        },
        body:{
            "email":email,
        }
    })
    const data = await userData.json()
    return data
}