import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

export default function BirthyearSelector(props:any){
    const inputProps = {
        placeholder: "N/A",
        disabled: props.dis,
        type: "number",
        id: props.id,
    };
    return(
        <Datetime inputProps={inputProps} dateFormat="YYYY" timeFormat={false} closeOnSelect={true}/>
    )
}