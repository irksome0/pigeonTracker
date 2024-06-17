import styles from "@/components/styles/PigeonItem.module.css"
import specialStyles from "@/components/styles/Modal.module.css"
import { MdInvertColors } from "react-icons/md";
import { BsGenderMale, BsGenderFemale} from "react-icons/bs";
import { IoMdWoman, IoMdMan } from "react-icons/io";
import { IoMdCreate } from "react-icons/io";
import { GiNewBorn } from "react-icons/gi";

export const PigeonItem = (props: any) => {

    const selectPigeon = (event: any) => {
        event.preventDefault();
        const id = event.target.children[0].children[1].innerText;
        const code = event.target.children[0].children[0].innerText.substr(1);
        const colour = event.target.children[1].children[0].innerText;
        const birthyear = event.target.children[1].children[1].innerText;
        const gender = event.target.children[1].children[2].innerText;
        const mother = event.target.children[1].children[3].innerText;
        const father = event.target.children[1].children[4].innerText;
        (document.getElementById("id") as HTMLInputElement).value = id;
        (document.getElementById("code") as HTMLInputElement).value = code;  
        (document.getElementById("birthyear") as HTMLInputElement).value = birthyear;
        (document.getElementById("colour") as HTMLInputElement).value = colour;
        (document.getElementById("gender") as HTMLInputElement).value = gender.includes("M") ? "cock" : "hen";
        (document.getElementById("mother") as HTMLInputElement).value = mother;
        (document.getElementById("father") as HTMLInputElement).value = father;
    }
    if(props.type == "dashboard"){
        return(
            <form onSubmit={selectPigeon} className={styles.item_container}>
                <div className={styles.item_headers}>
                    <h3>#{props.pigeonNumber}</h3>
                    <h4>{props.id}</h4>
                    <button type="submit" className={styles.submit_button}><IoMdCreate/></button>
                </div>
                <div className={styles.item_description}>
                    <p><MdInvertColors className={styles.icon}/>{props.colour}</p>
                    <p><GiNewBorn className={styles.icon}/>{props.yearOfBirth}</p>
                    {props.gender == "M" ? (
                        <p>
                            <BsGenderMale className={styles.icon}/>
                            {props.gender}
                        </p>
                        ):(
                        <p>
                            <BsGenderFemale className={styles.icon}/>
                            {props.gender}
                        </p>
                    )}
                    <p><IoMdWoman className={styles.icon}/>{props.mother}</p>
                    <p><IoMdMan className={styles.icon}/>{props.father}</p>
                </div>
            </form>
        )}
    else if(props.type == "controlpanel"){
        return(
            <form className={specialStyles.item_container}>
                <div className={specialStyles.item_headers}>
                    <h3>#{props.pigeonNumber}</h3>
                    <h4>{props.id}</h4>
                </div>
                <div className={specialStyles.item_description}>
                    <p><MdInvertColors className={specialStyles.icon}/>{props.colour}</p>
                    <p><GiNewBorn className={specialStyles.icon}/>{props.yearOfBirth}</p>
                    {props.gender == "M" ? (
                        <p>
                            <BsGenderMale className={specialStyles.icon}/>
                            {props.gender}
                        </p>
                        ):(
                        <p>
                            <BsGenderFemale className={specialStyles.icon}/>
                            {props.gender}
                        </p>
                    )}
                    <p><IoMdWoman className={specialStyles.icon}/>{props.mother}</p>
                    <p><IoMdMan className={specialStyles.icon}/>{props.father}</p>
                </div>
            </form>
    )};
}