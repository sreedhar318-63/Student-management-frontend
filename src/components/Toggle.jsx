import { useState } from "react";
import StudentList from "./StudentList";
function Toggle(){
    const [value,setvalue]=useState(false)
    const handleToggle=()=>setvalue(!value)
    return(
        <>
        <button onClick={handleToggle}>{value ? "hide student":"show student"}</button>
        {value && <StudentList/>}
     </>
    );
}
export default Toggle