"use server";


export const deletePigeon = async (id:string | undefined) => {
    await fetch(`http://localhost:5206/api/Pigeons/${id}`,{
    method:"DELETE",
    headers:{
        "accept": "*/*"
    },
    });
}