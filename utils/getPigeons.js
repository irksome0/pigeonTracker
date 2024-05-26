"use server"

export const getPigeons = async (email) =>{
    const response = await fetch(`http://localhost:5206/api/Pigeons/by-email/${email}`,{
        method:"GET",
    })
    const data = await response.json()
    return data
}