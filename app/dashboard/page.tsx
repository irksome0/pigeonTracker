"use client";

import { useRouter } from "next/navigation";
import styles from "@/components/styles/Dashboard.module.css"
import { useSession } from "next-auth/react";

export default function Dashboard(){
    const router = useRouter()
    const {data: session} = useSession({
        required: true,
        onUnauthenticated(){
            router.replace("/")
        },
        });

    return(
        <>
            <div className={styles.menu_wrapper}>
                <div className={styles.list_wrapper}>
                    <h1>Your pigeons</h1>
                    <div className={styles.list_container}>

                    </div>
                </div>
                <div className={styles.edit_wrapper}>

                </div>
            </div>
        </>
    )
}