"use client";

import React from "react";
import styles from "./styles/NavigationButton.module.css"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import  AuthenticatedMenu from "@/components/AuthenticatedMenu"
import { FaRegCircle } from "react-icons/fa";

export default function Nav(){
    const router = useRouter()
    const {data: session} = useSession()

    return(
        <>
            {!session ?(
            <nav>
                <button onClick={() => router.replace("/login")} className={styles.button_base}>
                    <FaRegCircle style={{fontSize: "1rem", position:"relative",bottom:"1px", right:"5px"}}/>
                    Log in
                </button>
                <button onClick={() => router.replace("/register")} className={styles.button_primary}>
                    <FaRegCircle style={{fontSize: "1rem", position:"relative",bottom:"1px", right:"5px"}}/>
                    Sign up
                </button>
            </nav>
            ):(
            <nav>
                <AuthenticatedMenu name={session?.user?.name} email={session?.user?.email}/>
            </nav>
            )
            }
        </>
    )
}