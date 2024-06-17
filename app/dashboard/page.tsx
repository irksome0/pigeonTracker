"use client";

import { useRouter } from "next/navigation";
import styles from "@/components/styles/Dashboard.module.css"
import { useSession } from "next-auth/react";
import { IoIosAddCircle, IoMdCreate } from "react-icons/io";
import { IconContext } from "react-icons";
import { TbTrashFilled } from "react-icons/tb";
import { useEffect, useState } from "react";
import BirthyearSelector from "@/components/BirthyearSelector";
import {createPigeon} from "@/utils/createPigeon";
import { getPigeons} from "@/utils/getPigeons";
import { PigeonItem } from "@/components/PigeonItem";
import {updatePigeon} from "@/utils/updatePigeon"
import {deletePigeon} from "@/utils/deletePigeon"


export default function Dashboard(){
    const router = useRouter()
    const {data: session} = useSession({
        required: true,
        onUnauthenticated(){
            router.replace("/")
        },
    });
    const [isDisabled, setDisabled] = useState(true)
    const [action, setAction] = useState("create")
    const [pigeons, setPigeons] = useState([{
        id: 0,
        pigeonNumber: 0,
        yearOfBirth: 0,
        country: "none",
        gender: "",
        colour:"",
        mother:0,
        father:0,
        email:"",
    }])
    const randomNumberInRange = (min=0, max=1000000) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };
 
    const setCreateMode = () =>{
        setDisabled(prev => !prev)
        setAction("create")
    }
    const setEditMode = () => {
        setDisabled(prev => !prev)
        setAction("edit")
    }
    const handleDeletePigeon = () => {
        const i = (document.getElementById("id") as HTMLInputElement).value;
        deletePigeon(i)
    }
    const setSelectedItem = () =>{

    }
    const handleCreatePigeon = (code: number,
         birthyear: number, country :string,
          colour:string, gender: string, mother: number, father: number) =>{
        createPigeon(code,birthyear,gender,colour,country, mother,father, session?.user?.email)
    }
    const handleUpdatePigeon = (id:number,code: number,
        birthyear: number, country :string,
         colour:string, gender: string, mother: number, father: number) =>{
            updatePigeon(id,code,birthyear,country,colour,gender,mother,father, session?.user?.email);
        }
    useEffect(()=>{
        if(session?.user?.email){
            getPigeons(session?.user?.email)
            .then((res) =>{
                setPigeons(res)
            })
            .catch((error) => console.error(error))
            
        }
    },[session])

    const handleSubmit = (event: any) => {
        event.preventDefault()
        console.log(event)
        const code = !event.target[0].value ? randomNumberInRange() : event.target[0].value
        const birthyear = Number(event.target[1].value)
        const country = "none"
        const colour = event.target[2].value 
        const gender = event.target[3].value == "hen" ? "F" : "M"
        const mother = Number(event.target[4].value)
        const father = Number(event.target[5].value)
        const id = Number(event.target[6].value)
        switch(action){
            case "create":
                handleCreatePigeon(code, birthyear, country, colour, gender, mother, father);
                setDisabled(prev => !prev);
                break;
            case "edit":
                handleUpdatePigeon(id,code, birthyear, country, colour, gender, mother, father);
                setDisabled(prev => !prev)
                break;
        }
    }
    return(
        <>
            <div className={styles.menu_wrapper}>
                <div className={styles.list_wrapper}>
                    <h1>Your pigeons</h1>
                    <div className={styles.list_container}>
                        {pigeons.map((element, index) => <PigeonItem type="dashboard" key={index} pigeonNumber={element.pigeonNumber} gender={element.gender} colour={element.colour}
                        country={element.country} yearOfBirth={element.yearOfBirth} id={element.id} mother={element.mother} father={element.father}/>)}
                    </div>
                </div>
                <div className={styles.item_wrapper}>
                    <nav>
                        <h2 style={{margin:"0px"}}>Pigeon</h2>
                        <div className={styles.item_controls}>
                            <IconContext.Provider value={{size:"30px"}}>
                                <IoIosAddCircle onClick={setCreateMode} className={styles.add_icon}/>
                                <IoMdCreate onClick={setEditMode} className={styles.edit_icon}/>
                                <TbTrashFilled onClick={handleDeletePigeon} className={styles.delete_icon}/>
                            </IconContext.Provider>
                        </div>
                    </nav>
                    <form id="item-form" onSubmit={handleSubmit}>
                        <label htmlFor="code">Code</label>
                        <input id="code" name="code" type="number" min="6" disabled={isDisabled}/>
                        <label htmlFor="birthyear">Year of birth</label>
                        <BirthyearSelector id="birthyear" dis={isDisabled}/>
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
                        <input id="father" name="father" type="number" disabled={isDisabled} />
                        <input id="id" disabled={true} hidden={true}></input>
                        <button hidden={isDisabled} type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}