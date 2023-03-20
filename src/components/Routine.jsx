import react, {useState, useEffect} from "react";
import {getMyUser} from "./API-adapt/index"
import { Link } from "react-router-dom";
const Routine = (props) =>
{
    const [isOwner, setIsOwner] = useState(false)

    const routine = props.routine;

    async function checkIsOwner(creatorId)
    {
        const user = await getMyUser(localStorage.getItem("token"));
        setIsOwner(user.id === creatorId);
    }
    useEffect(()=>{
        checkIsOwner(routine.creatorId);
    })
    return(
        <div id="RoutineCard">
            <h1>Routine</h1>
            <div>{routine.id}</div>
            <div>{routine.creatorName}</div>
            <div>{routine.name}</div>
            <div>{routine.goal}</div>
            <div><h2>Activities: </h2></div>
            {
                isOwner ? <Link to={`/edit/${routine.id}`}>
                <button>edit</button>
                </Link>: null
            }
            <div>{
                routine.activities.map((activity, idx)=>{
                    return (
                        
                        <div id="activity" key={`activities: ${idx}`}>
                        <div>{activity.name}</div>
                        <div>{activity.description}</div>
                        </div>
                    )
                })
                }
                </div>
           
        </div>
    )
}

export default Routine;