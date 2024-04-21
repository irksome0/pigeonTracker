"use client";

import activeIcon from "@/public/active-button.svg"
import Image from "next/image"
import styles from "./styles/NavigationButton.module.css"
import Link from "next/link"
import { useRouter } from "next/navigation";


export const NavigationButton = (props: any) => {
    const router = useRouter();
    function handleRoute(r: string){
        router.replace(r);
    }
    // useEffect(()=>{
    //     signOut();
    // })
    if(props.type == "register"){
        return(
            <button onClick={() => handleRoute("/register")} className={styles.button_primary}>
                <Image src={activeIcon} className={styles.button_part_2}alt="icon"/>
                {props.text}
            </button>
        );
    }else if(props.type == "menu"){
        return(
            <button onClick={() => handleRoute("/menu")} className={styles.button_base}>
                <Image src={activeIcon} className={styles.button_part_1} alt="icon"/>
                {props.text}
            </button>
            );
    }else if(props.type == "logout"){
        return(
            <button className={styles.button_primary}>
                <Image src={activeIcon} className={styles.button_part_2} alt="icon"/>
                {props.text}
            </button>
        );
    }else{
        return(
            <button onClick={() => handleRoute("/login")} className={styles.button_base}>
                <Image src={activeIcon} className={styles.button_part_1} alt="icon"/>
                {props.text}
            </button>
        );
    }
}