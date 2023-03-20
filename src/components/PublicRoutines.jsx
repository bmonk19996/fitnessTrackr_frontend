import React, {useState, useEffect} from "react";
import {getRoutines} from "./API-adapt/index";

import Routine from "./Routines";

const PublicRoutines = (props)=>
{
    const [routines, setRoutines] = useState([]);


    const pullRoutines = async () =>
    {
        try{
        console.log("hi");
        let result = await getRoutines();
        console.log("hello from the other side")
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
                    ></Routine>
                })
            }
        </div>
    )
}

export default PublicRoutines;