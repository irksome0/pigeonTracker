
import { PigeonItem } from "@/components/PigeonItem";

interface PigeonsListProps{
    pigeons:{
        id: number;
        pigeonNumber: number;
        yearOfBirth: number;
        country: string;
        gender: string;
        colour: string;
        mother: number;
        father: number;
        email: string;
    }[]
}
export const PigeonsList = (props: PigeonsListProps) => {
    return(
        <>
            {props.pigeons.map((element, index) => <PigeonItem type="dashboard" key={index} pigeonNumber={element.pigeonNumber} gender={element.gender} colour={element.colour}
                     yearOfBirth={element.yearOfBirth} id={element.id} mother={element.mother} father={element.father}/>)}
        </>
    )
}
