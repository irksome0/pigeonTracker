import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

interface BirthyearState{
    dis: boolean;
    id: string | undefined;
}

export default function BirthyearSelector(props: BirthyearState){
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