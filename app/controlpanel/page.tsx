"use client";

import { UsersList } from "@/components/UsersList";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import styles from "@/components/styles/ControlPanel.module.css"
import UserContainer from "@/components/UserContainer";

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
        UsersList(session?.user?.email).then(result =>{
          setUsers(result)
        }).catch(error => {
          console.error('Error fetching data:', error);
        });
      }
    }, [session])
    return (
      <div>
        <div className={styles.controlpanel_wrapper}>
            {users.map(element => 
              <UserContainer key={element.username} username={element.username} email={element.email}/>
            )}   
        </div>
      </div>
    )
}