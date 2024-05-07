"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles/NavigationButton.module.css"
import activeIcon from "@/public/active-button.svg"
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import  AuthenticatedMenu from "@/components/AuthenticatedMenu"

export default function Nav(){
    const router = useRouter()
    const {data: session} = useSession()
    // const [session, setSession] = useState(false)
    // useEffect(()=>{
    //     (
    //         async () =>{
    //             const res = fetch("http://127.0.0.1:3001/api/user",{
    //                 credentials:"include",
    //             });
    //             if((await res).ok){
    //                 setSession(true)
    //             }
    //             else{
    //                 setSession(false)
    //             }
    //         }
    //     )();
    // });
    const handleSignOut = () =>{
        // const res = await fetch("http://127.0.0.1:3001/api/logout",{
        //     method: "POST",
        //     credentials:"include",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });
        // if((await res).ok){
        //     setSession(false)
        //     router.replace("/");
        // }
        signOut()

    }

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
                {/* <button onClick={() => router.replace("/dashboard")} className={styles.button_base}>
                    <Image src={activeIcon} className={styles.button_part_1} alt="icon"/>
                    Menu
                </button>
                <button onClick={handleSignOut} className={styles.button_primary}>
                    <Image src={activeIcon} className={styles.button_part_2} alt="icon"/>
                    Sign out
                </button> */}
                <AuthenticatedMenu name={session?.user?.name} email={session?.user?.email}/>
            </nav>
            )
            }
        </div>
    )
}