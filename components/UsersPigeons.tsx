import styles from "@/components/styles/Modal.module.css"
import { PigeonItem } from "./PigeonItem"
import { IoMdExit } from "react-icons/io";

interface UserPigeonsProps {
    pigeons: Array<Object>;
    hidden: boolean;
    handleClose: () => void;
}

export const UsersPigeons = ( {pigeons,hidden,handleClose}:UserPigeonsProps) => {
    return(
        <div hidden={hidden} className={styles.modalWrapper}>
            <div className={styles.modal}>
                <button onClick={handleClose} className={styles.modalCloseButton}><IoMdExit/></button>
                <hr/>
                {pigeons.map((element:any,index:number) => <PigeonItem key={index} type="controlpanel" pigeonNumber={element.pigeonNumber} gender={element.gender} colour={element.colour}
                yearOfBirth={element.yearOfBirth} id={element.id} mother={element.mother} father={element.father}/>)}
            </div>
        </div>
    )
}