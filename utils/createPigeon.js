"use server"

export const createPigeon = async(props) =>{

    const response = await fetch("https://localhost:7083/api/Pigeons",{
        method:"POST",
        headers:{
            "Content-type": "application/json", 
        },
        body:{
                "pigeonNumber": props.pigeonNumber,
                "yearOfBirth": props.yearOfBirth,
                "gender": props.Gender,
                "colour": props.Colour,
                "country": props.Country,
                "mother": props.Mother,
                "father": props.Father,
                "ownerId": props.userEmail
        }
    })
}