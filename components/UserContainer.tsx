import { TbTrashFilled } from "react-icons/tb";
import styles from "@/components/styles/ControlPanel.module.css"
import { IconContext } from "react-icons";
import { SyntheticEvent, useState } from "react";
import {deleteUser} from "@/utils/deleteUser";
import {getUserPigeons} from "@/utils/getUserPigeons";
import { UsersPigeons } from "./UsersPigeons";
import { createPortal } from "react-dom";

export default function UserContainer(props: any){

    const [action, setAction] = useState("none")
    const [isModalHidded, setIsModalHidden] = useState(true)
    const [pigeons, setPigeons] = useState([
        {
        id:0,
        pigeonNumber:0,
        yearOfBirth:0,
        gender:"",
        colour:"",
        country:"",
        mother:0,
        father:0,
        email:""
    }])

    const handleDeleteUser = () => {
        setAction("delete")
    }
    const handleViewUser = () => {

        getUserPigeons(props.email)
        .then(res => setPigeons(res))
        .catch(err => console.error(err));
        setIsModalHidden(prev => !prev)
        setAction("view")
    }
    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault()
        if(action == "delete"){
            deleteUser(props.email, props.currentUser)
        }else{
            console.log("view")
        }
    }
     return(
        <>
            {!isModalHidded && createPortal(
                <UsersPigeons pigeons={pigeons} hidden={isModalHidded} handleClose={() => setIsModalHidden(true)}/>,
                document.body
            )}
            {/* <UsersPigeons pigeons={pigeons} hidden={isModalHidded}/> */}
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
        </>
        )  
}