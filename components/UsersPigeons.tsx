import styles from "@/components/styles/Modal.module.css"
import { PigeonItem } from "./PigeonItem"
import { IoMdExit } from "react-icons/io";

interface UserPigeonsState {
    pigeons: Array<Object>;
    hidden: boolean;
    handleClose: () => void;
}

export const UsersPigeons = ( {pigeons,hidden,handleClose}:UserPigeonsState) => {
    return(
        <div hidden={hidden} className={styles.moduleWrapper}>
            <div className={styles.module}>
                <button onClick={handleClose} className={styles.moduleCloseButton}><IoMdExit/></button>
                <hr></hr>
                {pigeons.map((element:any,index:number) => <PigeonItem key={index} type="controlpanel" pigeonNumber={element.pigeonNumber} gender={element.gender} colour={element.colour}
                 country={element.country} yearOfBirth={element.yearOfBirth} id={element.id} mother={element.mother} father={element.father}/>)}
            </div>
        </div>
    )
}