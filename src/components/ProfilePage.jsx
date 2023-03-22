import React, { useEffect, useState } from "react";
import {getMyUser, getUserPublicRoutines} from "./API-adapt/index"
import {Routine} from "./";


const ProfilePage = (props)=>
{
   const [user, setUser] = useState({})
   const [routines, setRoutines] = useState([])

   useEffect(()=>{
    setUserInfo();
   },[])

   const setUserInfo = async()=>{
    const myUser = await getMyUser(localStorage.getItem("token"))
    const myRoutines = await getUserPublicRoutines(localStorage.getItem("token"), myUser.username)

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
                     routine={routine}
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