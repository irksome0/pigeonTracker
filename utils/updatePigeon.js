"use server";

export const updatePigeon = async (props) => {
    const response = await fetch(`http://localhost:5206/api/Pigeons/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
            "accept": "*/*",
        },
        body: JSON.stringify({
            "id": props.id,
            "pigeonNumber": props.pigeonNumber,
            "yearOfBirth": props.yearOfBirth,
            "gender": props.gender,
            "colour": props.colour,
            "country": props.country,
            "mother": props.mother,
            "father": props.father,
            "email": props.email
        })
    })
    console.log(response);
}