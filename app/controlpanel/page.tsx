"use client";

import { UsersList } from "@/components/UsersList";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import styles from "@/components/styles/Dashboard.module.css"

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
      UsersList(session?.user?.email).then(result =>{
        setUsers(result)
      }).catch(error => {
        console.error('Error fetching data:', error);
      });;
    }, [])
  
    return (
      <div>
        <div className={styles.menu_wrapper}>

            {users.map(element => 
              <div key={element.username} style={{display:"flex", flexDirection:"row", gap:"20px"}}>
                <p style={{margin:"0"}}><b>Email: </b>{element.email}</p>
                <p style={{margin:"0"}}><b>Name: </b>{element.username}</p>
              </div>)}   
        </div>
        {/* <button onClick={() => (console.log(data))}>show</button> */}
      </div>
    )
}