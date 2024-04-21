"use client";

import { NavigationButton } from "@/components/NavigationButton";
import { signOut, useSession } from "next-auth/react";
import styles from "./styles/NavigationButton.module.css"
import activeIcon from "@/public/active-button.svg"
import Image from "next/image";
import Link from "next/link";

export default function Nav(){
    const {data: session}: any = useSession();

    return(
        <div>
        {!session ? (
            <nav>
                <Link href={"/login"} className={styles.button_base}>
                    <Image src={activeIcon} className={styles.button_part_1} alt="icon"/>
                    Log in
                </Link>
                <Link href={"/register"} className={styles.button_primary}>
                        <Image src={activeIcon} className={styles.button_part_2}alt="icon"/>
                        Sign up
                </Link>
            </nav>
        ): (
            <nav>
                <Link href={"/menu"} className={styles.button_base}>
                    <Image src={activeIcon} className={styles.button_part_1} alt="icon"/>
                    Menu
                </Link>
                <button onClick={() => signOut()} className={styles.button_primary}>
                    <Image src={activeIcon} className={styles.button_part_2} alt="icon"/>
                    Sign out
                </button>
            </nav>
            )
        }
        </div>
    )
}