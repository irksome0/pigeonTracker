import styles from "@/components/styles/PigeonItem.module.css"
import { MdInvertColors } from "react-icons/md";
import { BsGenderMale, BsGenderFemale} from "react-icons/bs";
import { IoMdWoman, IoMdMan } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { pigeonSelect } from "@/lib/features/user/pigeonSlice";
import { IoMdCreate } from "react-icons/io";
import { GiNewBorn } from "react-icons/gi";
import { SyntheticEvent } from "react";

export const PigeonItem = (props: any) => {
    const dispatch = useDispatch<AppDispatch>()

    const selectPigeon = (event: any) => {
        event.preventDefault();
        const id = event.target.children[0].children[1].innerText;
        const code = event.target.children[0].children[0].innerText.substr(1);
        const colour = event.target.children[1].children[0].innerText;
        const birthyear = event.target.children[1].children[1].innerText;
        const gender = event.target.children[1].children[2].innerText;
        const country = event.target.children[1].children[3].innerText;
        const mother = event.target.children[1].children[4].innerText;
        const father = event.target.children[1].children[5].innerText;
        // console.log(event);
        // dispatch(pigeonSelect({id,code,colour,birthyear,gender,country,mother,father}));
        (document.getElementById("id") as HTMLInputElement).value = id;
        (document.getElementById("code") as HTMLInputElement).value = code;  
        (document.getElementById("birthyear") as HTMLInputElement).value = birthyear;
        (document.getElementById("colour") as HTMLInputElement).value = colour;
        (document.getElementById("gender") as HTMLInputElement).value = gender.includes("M") ? "cock" : "hen";
        (document.getElementById("mother") as HTMLInputElement).value = mother;
        (document.getElementById("father") as HTMLInputElement).value = father;
        // // (document.getElementById("country") as HTMLInputElement).value = country;
    }

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
                <p><FaLocationDot className={styles.icon}/>{props.country}</p>
                <p><IoMdWoman className={styles.icon}/>{props.mother}</p>
                <p><IoMdMan className={styles.icon}/>{props.father}</p>
            </div>
        </form>
    )
}