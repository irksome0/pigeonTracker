import pedigreeStyles from "./styles/Pedigree.module.css"
import {StyleSheet, View, Text} from "@react-pdf/renderer"

interface PedigreeItem{
    pigeonNumber: number | null;
    mother: PedigreeItem | null;
    father: PedigreeItem | null;
}

interface PedigreeProps{
    pigeons: PedigreeItem,
}

const styles = StyleSheet.create({
    block:{
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    item: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width: "100px",
        height: "60px",
        backgroundColor: "rgba(98,110,149, 1)",
        color: "#EBECF3",
        borderRadius: "12px",
        cursor: "default",
        fontSize:"12px",
        margin:"0px 10px"
    },
    parents:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    

})


export const Pedigree = (props: PedigreeProps) =>{
    return(
        <>
            <PedigreeGenerator pigeons={props?.pigeons}/>
        </>
    )
}

function PedigreeGenerator(props: PedigreeProps | null){
    if(props?.pigeons.pigeonNumber === null){
        return(<></>)
    }
    if(props?.pigeons.mother === null && props.pigeons.father === null){
        return(
            <View style={styles.item}>
                <Text>{props.pigeons.pigeonNumber}</Text>
            </View>
        )
    }
    return(
        <View style={styles.block}>
            <View style={styles.item}>
                <Text>{props?.pigeons.pigeonNumber}</Text> 
            </View>

            <View style={styles.parents}>
                    <PedigreeGenerator pigeons={props?.pigeons.mother as PedigreeItem}/>
                    <PedigreeGenerator pigeons={props?.pigeons.father as PedigreeItem}/>
            </View>
        </View>
    )
}