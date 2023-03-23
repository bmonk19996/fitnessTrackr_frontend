import React, { useEffect, useState } from "react";
import {getMyUser, getUserPublicRoutines} from "./API-adapt/index"
import {Routine} from "./";


const ProfilePage = (props)=>
{
    const token = props.token
   const [user, setUser] = useState({})
   const [routines, setRoutines] = useState([])

   useEffect(()=>{
    setUserInfo();
   },[])

   const setUserInfo = async()=>{
    const myUser = await getMyUser(token)
    const myRoutines = await getUserPublicRoutines(token, myUser.username)

    setUser(myUser);
    setRoutines(myRoutines)
   }
console.log(routines)

console.log(user)
    return(
        <div>
            <h1>{user.username}</h1>
            {
                 routines.map((routine, idx)=>
                 {
                     return <Routine
                     key={'routineidx: '+idx}
                     token={token}
                     routine={routine}
                     idx={idx}
                     routines={routines}
                     setRoutines={setRoutines}
                     editRoutineActivity={true}
                     ></Routine>
                 })
            }
        </div>
    )
}

export default ProfilePage;