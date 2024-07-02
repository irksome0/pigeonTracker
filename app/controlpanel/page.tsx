"use client";

import { UsersList } from "@/components/UsersList";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import styles from "@/components/styles/ControlPanel.module.css"
import UserContainer from "@/components/UserContainer";
import { checkAdmin } from "@/utils/checkAdmin";

export default function ControlPanel(){
    const router = useRouter()
    const {data: session} = useSession({
        required: true,
        onUnauthenticated(){
            router.replace("/")
        },
    });
    const [users, setUsers] = useState([{email:"", username:""}])

    useEffect(()=>{
      if (session?.user?.email){
        checkAdmin(session?.user?.email)
        .then((res) => {
          if(!res){
            router.replace("/")
          }else{
            UsersList(session?.user?.email as string)
          .then(result => setUsers(result))
          .catch(error => console.error('Error fetching data:', error));
          }
        })
        .catch((error) => console.error("Error fetching data:", error))
      }
    }, [session,router])
    return (
      <div>
        <div className={styles.controlpanel_wrapper}>
            {users.map(element => 
              <UserContainer key={element.username} username={element.username} email={element.email} currentUser={session?.user?.email as string}/>
            )}   
        </div>
      </div>
    )
}