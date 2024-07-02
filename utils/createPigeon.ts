"use server"

export const createPigeon = async(
    pigeonNumber:number, 
    yearOfBirth:number, 
    gender:string, 
    colour:string, 
    country:string, 
    mother:number, 
    father:number, 
    userEmail:string
) => {
    
    await fetch("http://localhost:5206/api/Pigeons",{
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