"use server";

export const getUserPigeons = async (email) => {
    const response = await fetch(`http://localhost:5206/api/Pigeons/by-email/${email}`,{
        method:"GET",
        headers:{"accept":"*/*"}
    });
    const data = await response.json();
    return data;
}