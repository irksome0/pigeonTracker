"use client";

import React, {useEffect, useState} from "react";
import styles from "./styles/Navigation.module.css"
import { useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
import  AuthenticatedMenu from "@/components/AuthenticatedMenu"
import { FaRegCircle } from "react-icons/fa";
import { revalidate } from "@/utils/revalidate";
import MobileAuthenticationMenu from "./MobileAuthenticationMenu";


export default function Nav(){
    const router = useRouter()
    const {data: session} = useSession()
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const redirect = (path: string) => {
        router.replace(path);
        revalidate(path);
        router.refresh();
    }

    const checkMobile = () => {
        if(typeof window !== "undefined"){
            return window.innerWidth < 800;
        }
    }
    useEffect(()=>{
        setIsMobile(checkMobile() as boolean);
    },[session]) 

    return(
        <>
            {!session ? (
                isMobile ? (
                    <div className={styles.navigation}>
                        <MobileAuthenticationMenu/>
                    </div>
                ):(
                    <div className={styles.navigation}>
                        <button onClick={() => redirect("/login")} className={styles.button_base}>
                            <FaRegCircle style={{fontSize: "1rem", position:"relative",bottom:"1px", right:"5px"}}/>
                            Log in
                        </button>
                        <button onClick={() => redirect("/register")} className={styles.button_primary}>
                            <FaRegCircle style={{fontSize: "1rem", position:"relative",bottom:"1px", right:"5px"}}/>
                            Sign up
                        </button>
                    </div>
                )
            ):(
            <nav>
                <AuthenticatedMenu name={session?.user?.name as string | undefined} email={session?.user?.email as string | undefined}/>
            </nav>
            )
            }
        </>
    )
}