import { TbTrashFilled } from "react-icons/tb";
import styles from "@/components/styles/ControlPanel.module.css"
import { IconContext } from "react-icons";
import { SyntheticEvent, useState } from "react";
import {deleteUser} from "@/utils/deleteUser"

export default function UserContainer(props: any){

    const [action, setAction] = useState("none")
    const [deleteResult, setDeleteResult] = useState() 

    const handleDeleteUser = () => {
        setAction("delete")
    }
    const handleViewUser = () => {
        setAction("view")
    }
    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault()
        const email = event.target.children[1].innerText
        if(action == "delete"){
            deleteUser(email, currentUserEmail)
        }else{
            console.log("view")
        }
    }
    return(
        <div key={props.username} className={styles.user_container}>
            <form onSubmit={handleSubmit}>
                <h4>Email</h4>
                <p>{props.email}</p>
                <h4>User</h4>
                <p>{props.username}</p>
                <div className={styles.user_container_controls} style={{display:"flex", flexDirection:"row"}}>
                    <button type="submit" onClick={handleViewUser}>Pigeons</button>
                    <IconContext.Provider value={{size:"38px",}}>
                        <button style={{background:"transparent", width:"30px",padding:"0"}} type="submit"><TbTrashFilled onClick={handleDeleteUser} id="delete-button" className={styles.trash_icon}/></button>
                    </IconContext.Provider>
                </div>
            </form>
        </div>
        )  
}