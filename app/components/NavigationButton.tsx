import activeIcon from "@/public/active-button.svg"
import Image from "next/image"
import styles from "./styles/NavigationButton.module.css"

export const NavigationButton = (props: any) => {
    if(props.type == "primary"){
        return(
            <a href={"/register"} className={styles.button_primary}>
                <Image src={activeIcon} className={styles.button_part_2}alt="icon"/>
                {props.text}
            </a>
        )
    }
    return(
        <a href="/login" className={styles.button_base}>
            <Image src={activeIcon} className={styles.button_part_1} alt="icon"/>
            {props.text}
        </a>
    )
}