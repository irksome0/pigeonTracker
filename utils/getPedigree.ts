"use server";


interface UnformattedPedigreeState{
    pigeonNumber: number,
    motherNumber: number,
    fatherNumber: number,
    grandMotherFromMother: number,
    grandFatherFromMother: number,
    grandMotherFromFather: number,
    grandFatherFromFather: number,
}
interface PedigreeState{
    pigeonNumber: number | null;
    mother: PedigreeState | null;
    father: PedigreeState | null;
}

export const getPedigree = async (id:number) =>{
    const res = await fetch(`http://localhost:5206/api/Pigeons/pedigree/${id}`,{
        method:"GET",
        headers:{accept:"*/*"},
    })
    const responseData = await res.json();

    return formatPedigree(responseData[0]);
}


const formatPedigree = (unformattedData:UnformattedPedigreeState) : PedigreeState  => {
    let pedigree: PedigreeState = {
        pigeonNumber: unformattedData.pigeonNumber,
        mother: {
            pigeonNumber: unformattedData.motherNumber,
            mother:{
                pigeonNumber: unformattedData.grandMotherFromMother,
                mother: null,
                father: null,
            },
            father:{
                pigeonNumber: unformattedData.grandFatherFromMother,
                mother: null,
                father: null,
            }
        },
        father:{
            pigeonNumber: unformattedData.fatherNumber,
            mother:{
                pigeonNumber: unformattedData.grandMotherFromFather,
                mother: null,
                father: null,
            },
            father:{
                pigeonNumber: unformattedData.grandFatherFromFather,
                mother: null,
                father: null,
            }
        }
    };
    return pedigree;
}