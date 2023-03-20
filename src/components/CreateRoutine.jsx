import react, {useState} from "react";
import {useNavigate} from "react-router-dom"

import {getMyUser, makeRoutine} from "./API-adapt/index"

//creatorid, isPublic, name, goal



export const CreateRoutine =(props)=>
{
    const [name, setRoutineName] = useState(null);
    const [goal, setRoutineGoal] = useState(null);
    const [isPublic, setIsPublic] = useState(false);
    const navigate = useNavigate()

    const submitRoutine = async(event, fields)=>
{
    event.preventDefault();
    const {id} = await getMyUser(localStorage.getItem("token"));
    const result = await makeRoutine(localStorage.getItem("token"), {id, ...fields});
    console.log(result);
    if(!result.message)
    {
        //navigate("/");
        //window.location.reload();
    }else{
        console.log(result.message);
    }

}

    return (
        <div>
            <form onSubmit={(event)=>submitRoutine(event, {isPublic, name, goal})}>
                <label>
                    Routine Name: 
                    <input type="text" onChange={(event)=>setRoutineName(event.target.value)}/>
                </label>
                <label>
                    Routine Goal:
                    <input type = "text" onChange={(event)=>setRoutineGoal(event.target.value)}/>
                </label>
                <label>
                    Public: 
                    <input type="checkbox" onChange={(event)=>setIsPublic(event.target.value)}/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}