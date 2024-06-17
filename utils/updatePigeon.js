"use server";

export const updatePigeon = async (id,pigeonNumber,yearOfBirth,country,colour,gender,mother,father,email) => {
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