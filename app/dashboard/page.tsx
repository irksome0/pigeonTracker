"use client";

import { useRouter } from "next/navigation";
import styles from "@/components/styles/Dashboard.module.css"
import { useSession } from "next-auth/react";
import { IoIosAddCircle, IoMdCreate } from "react-icons/io";
import { IconContext } from "react-icons";
import { TbTrashFilled } from "react-icons/tb";
import { useState } from "react";

export default function Dashboard(){
    const router = useRouter()
    const {data: session} = useSession({
        required: true,
        onUnauthenticated(){
            router.replace("/")
        },
    });
    const [isSelected, setSelected] = useState(false)
    const [isDisabled, setDisabled] = useState(true)
    const [action, setAction] = useState("create")
    const [pigeon, setPigeon] = useState({
        code: 0,
    })

    const enableCreate = () =>{
        setDisabled(prev => !prev)
        setAction("create")
    }
    // const createPigeon = (event) =>{
        
    // }
    const deletePigeon = () => {
        // delete(pigeon.code)
    }
    const editPigeon = () => {
        setAction("edit")
    }
    const handleSubmit = (event: any) => {
        event.preventDefault()
        console.log(action)
        console.log("works!")
    }
    return(
        <>
            <div className={styles.menu_wrapper}>
                <div className={styles.list_wrapper}>
                    <h1>Your pigeons</h1>
                    <div className={styles.list_container}>
                    </div>
                </div>
                <div className={styles.item_wrapper}>
                    <nav>
                        <h2 style={{margin:"0px"}}>Pigeon</h2>
                        <div className={styles.item_controls}>
                            <IconContext.Provider value={{size:"30px"}}>
                                <IoIosAddCircle onClick={enableCreate} className={styles.add_icon}/>
                                <IoMdCreate className={styles.edit_icon}/>
                                <TbTrashFilled onClick={deletePigeon} className={styles.delete_icon}/>
                            </IconContext.Provider>
                        </div>
                    </nav>
                    <form id="item-form" onSubmit={handleSubmit}>
                        <label htmlFor="code">Code</label>
                        <input id="code" name="code" type="number" min="6" disabled={isDisabled}/>
                        <label htmlFor="colour">Colour</label>
                        <input id="colour" name="colour" type="text" disabled={isDisabled}/>
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" disabled={isDisabled}>
                            <option value="cock">Cock</option>
                            <option value="hen">Hen</option>
                        </select>
                        <label htmlFor="mother">Mother</label>
                        <input id="mother" name="mother" type="number" disabled={isDisabled}/>
                        <label htmlFor="father">Father</label>
                        <input id="mother" name="father" type="number" disabled={isDisabled} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}