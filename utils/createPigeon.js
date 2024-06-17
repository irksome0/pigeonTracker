"use server"

export const createPigeon = async(pigeonNumber, yearOfBirth, gender, colour, country, mother, father, userEmail) =>{
    
    const response = await fetch("http://localhost:5206/api/Pigeons",{
        method:"POST",
        headers:{
            "Content-type": "application/json",
            "accept": "*/*",
        },
        body: JSON.stringify({
                "pigeonNumber": pigeonNumber,
                "yearOfBirth": yearOfBirth,
                "gender": gender,
                "colour": colour,
                "country": country,
                "mother": mother,
                "father": father,
                "email": userEmail
        })
    });
}