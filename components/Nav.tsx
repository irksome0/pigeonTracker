"use client";

import React, {useEffect} from "react";
import styles from "./styles/NavigationButton.module.css"
import activeIcon from "@/public/active-button.svg"
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import  AuthenticatedMenu from "@/components/AuthenticatedMenu"

export default function Nav(){
    const router = useRouter()
    const {data: session} = useSession()

    return(
        <div>
            {!session ?(
            <nav>
                <button onClick={() => router.replace("/login")} className={styles.button_base}>
                    <Image src={activeIcon} className={styles.button_part_1} alt="icon"/>
                    Log in
                </button>
                <button onClick={() => router.replace("/register")} className={styles.button_primary}>
                        <Image src={activeIcon} className={styles.button_part_2}alt="icon"/>
                        Sign up
                </button>
            </nav>
            ):(
            <nav>
                <AuthenticatedMenu name={session?.user?.name} email={session?.user?.email}/>
            </nav>
            )
            }
        </div>
    )
}