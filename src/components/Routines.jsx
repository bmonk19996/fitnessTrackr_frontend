import react from "react";

const Routine = (props) =>
{
    const routine = props.routine;

    return(
        <div id="RoutineCard">
            <h1>Routine</h1>
            <div>{routine.id}</div>
            <div>{routine.creatorName}</div>
            <div>{routine.name}</div>
            <div>{routine.goal}</div>
            <div><h2>Activities: </h2></div>
            <div>{
                routine.activities.map((activity, idx)=>{
                    return (
                        
                        <div id="activity" key={`activities + ${idx}`}>
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