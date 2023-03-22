import React, {useState, useEffect} from "react";
import {getRoutines} from "./API-adapt/index";

import {Routine} from "./";

const PublicRoutines = (props)=>
{
    const [routines, setRoutines] = useState([]);


    const pullRoutines = async () =>
    {
        try{
        let result = await getRoutines();
        setRoutines(result);
        }
        catch(e)
        {
            throw e;
        }
    }
    
    useEffect(()=>
    {
        pullRoutines();
    }, []);

    return(
        <div id="publicRoutinePage">
            <h1>Routines</h1>
            {
                routines.map((routine, idx)=>
                {
                    return <Routine
                    key={'routine idx: '+idx}
                    routine={routine}
                    editRoutineActivity={false}
                    idx={idx}
                    ></Routine>
                })
            }
        </div>
    )
}

export default PublicRoutines;