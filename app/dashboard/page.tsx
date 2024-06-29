"use client";

import { useRouter } from "next/navigation";
import styles from "@/components/styles/Dashboard.module.css"
import { useSession } from "next-auth/react";
import { IoIosAddCircle, IoMdCreate } from "react-icons/io";
import { TbTrashFilled } from "react-icons/tb";
import { Suspense, useEffect,  useState } from "react";
import BirthyearSelector from "@/components/BirthyearSelector";
import { createPigeon } from "@/utils/createPigeon";
import { getPigeons} from "@/utils/getPigeons";
import { updatePigeon } from "@/utils/updatePigeon"
import { deletePigeon } from "@/utils/deletePigeon"
import { getPedigree } from "@/utils/getPedigree"
import { PigeonsList } from "@/components/PigeonsList";
import { renderPage } from "@/components/PDFpedigree";
import { FaSave } from "react-icons/fa";
import PigeonItemControlsMenu from "@/components/PigeonItemControlsMenu";

interface PedigreeItem{
    pigeonNumber: number | null;
    mother: PedigreeItem | null;
    father: PedigreeItem | null;
}

const initialPigeonsListState = {
    id: 0,
    pigeonNumber: 0,
    yearOfBirth: 0,
    country: "none",
    gender: "",
    colour:"",
    mother:0,
    father:0,
    email:"",
}
const initialPedigreeState : PedigreeItem = {
    pigeonNumber:0,
    mother:{
        pigeonNumber:0,
        mother:{
            pigeonNumber:0,
            mother:null,
            father:null,
        },
        father:{
            pigeonNumber:0,
            mother:null,
            father:null,
        }
    },
    father:{
        pigeonNumber:0,
        mother:{
            pigeonNumber:0,
            mother:null,
            father:null,
        },
        father:{
            pigeonNumber:0,
            mother:null,
            father:null,
        }
    }
}


export default function Dashboard(){
    const router = useRouter()
    const {data: session} = useSession({
        required: true,
        onUnauthenticated(){
            router.replace("/")
        },
    });
    const [isInputDisabled, setInputDisabled] = useState(true);
    const [action, setAction] = useState("create");
    const [pigeons, setPigeons] = useState([initialPigeonsListState]);
    const [pedigree, setPedigree] = useState<PedigreeItem>(initialPedigreeState);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(()=>{
        if(session?.user?.email){
            setIsMobile(checkMobile() as boolean);
            getPigeons(session?.user?.email)
            .then((res) =>{
                setPigeons(res)
            })
            .catch((error) => console.error(error))
        }
    },[session]);

    const randomNumberInRange = (min=0, max=1000000) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };
 
    const setCreateMode = () =>{
        setInputDisabled(prev => !prev)
        setAction("create")
    };
    const setEditMode = () => {
        setInputDisabled(prev => !prev)
        setAction("edit")
    };

    const handleDeletePigeon = () => {
        const i = (document.getElementById("id") as HTMLInputElement).value;
        deletePigeon(i)
    };
    
    const handleCreatePigeon = (code: number,
         birthyear: number, country :string,
          colour:string, gender: string, mother: number, father: number) =>{
        createPigeon(code,birthyear,gender,colour,country, mother,father, session?.user?.email)
    };

    const handleUpdatePigeon = (id:number,code: number,
        birthyear: number, country :string,
         colour:string, gender: string, mother: number, father: number) =>{
            updatePigeon(id,code,birthyear,country,colour,gender,mother,father, session?.user?.email);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault()
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
                setInputDisabled(prev => !prev);
                break;
            case "edit":
                handleUpdatePigeon(id,code, birthyear, country, colour, gender, mother, father);
                setInputDisabled(prev => !prev)
                break;
        }
    };

    const handleSaveToPDF = () => {
        getPedigree(3)
        .then((response) => {
            setPedigree(response)
        })
        .catch((error) => console.error(error));
        renderPage(pedigree)
    };

    const checkMobile = () => {
        if(typeof window !== "undefined"){
            return window.innerWidth < 800;
        }
    };

    return(
        <>
            <div className={styles.dashboard_wrapper}>
                <div className={styles.list_wrapper}>
                    <h1>Your pigeons</h1>
                    <div className={styles.list_container}>
                        <Suspense fallback={<Loading/>}>
                            <PigeonsList pigeons={pigeons}/>
                        </Suspense>
                    </div>
                </div>
                <div className={styles.item_wrapper}>
                    <nav>
                        <h2>Pigeon</h2>
                        {isMobile ? (
                            <div className={styles.item_controls}>
                                <PigeonItemControlsMenu setCreateMode={setCreateMode} setEditMode={setEditMode} deleteItem={handleDeletePigeon}/>
                            </div>
                        ):(
                            <div className={styles.item_controls}>
                                <h3>Create</h3>
                                <IoIosAddCircle onClick={setCreateMode} className={styles.icon}/>
                                <h3>Edit</h3>
                                <IoMdCreate onClick={setEditMode} className={styles.icon}/>
                                <h3>Delete</h3>
                                <TbTrashFilled onClick={handleDeletePigeon} className={styles.icon}/>
                                <h3>PDF</h3>
                                <FaSave onClick={() => handleSaveToPDF()} className={styles.icon}/>
                            </div>
                        )}
                    </nav>
                    <form id="item-form" onSubmit={handleSubmit}>
                        <label htmlFor="code">Code</label>
                        <input id="code" name="code" type="number" min="6" disabled={isInputDisabled}/>
                        <label htmlFor="birthyear">Year of birth</label>
                        <BirthyearSelector id="birthyear" dis={isInputDisabled}/>
                        <label htmlFor="colour">Colour</label>
                        <input id="colour" name="colour" type="text" disabled={isInputDisabled}/>
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" disabled={isInputDisabled}>
                            <option value="cock">Cock</option>
                            <option value="hen">Hen</option>
                        </select>
                        <label htmlFor="mother">Mother</label>
                        <input id="mother" name="mother" type="number" disabled={isInputDisabled}/>
                        <label htmlFor="father">Father</label>
                        <input id="father" name="father" type="number" disabled={isInputDisabled} />
                        <input id="id" disabled={true} hidden={true}></input>
                        <button hidden={isInputDisabled} type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

function Loading(){
    return(
        <>
            <h1>LOADING...</h1>
        </>
    );
}