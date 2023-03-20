import React, { useState } from "react";

const UpdateRoutine = () => {
  return <div>
            <form onSubmit={(event)=>UpdateRoutine(event, {isPublic, name, goal})}>
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

  </div>;
};

export default UpdateRoutine;
