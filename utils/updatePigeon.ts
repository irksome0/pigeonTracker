"use server";

export const updatePigeon = async (
    id: number,
    pigeonNumber:number,
    yearOfBirth:number,
    country:string,
    colour:string,
    gender:string,
    mother:number,
    father:number,
    email:string) => {
    await fetch(`http://localhost:5206/api/Pigeons/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
            "accept": "*/*",
        },
        body: JSON.stringify({
            "id":id,
            "pigeonNumber": pigeonNumber,
            "yearOfBirth": yearOfBirth,
            "gender": gender,
            "colour": colour,
            "country": country,
            "mother": mother,
            "father": father,
            "email": email
        })
    })
}