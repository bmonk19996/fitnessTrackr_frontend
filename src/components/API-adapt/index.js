const BASE_URL = "http://localhost:3000/api";

function makeHeaders(token){
    const header = { "Content-Type": "application/json" };
    if (token) {
      header.Authorization = `Bearer ${token}`;
    }
    return header;
}

  export const register = async (username, password)=>
  {
    try
    {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method:"POST",
        headers:makeHeaders(),
        body:JSON.stringify({
          username:username,
          password:password
        })
      });
      const result = await response.json();
      return result;
    }
    catch(e)
    {
      throw e;
    }
  }
  export const login = async (username, password) =>{

    try{
      const response = await fetch(`${BASE_URL}/users/login`,{
        method:"POST",
        headers: makeHeaders(),
        body:JSON.stringify({
          username:username,
          password:password
        })
      });
      const result = await response.json();
      return result;
    }catch(error)
    {
      throw error;
    }
  }

  export const getMyUser = async (token) =>
  {
    try{
      const response = await fetch(`${BASE_URL}/users/me`, {
        method:"GET",
        headers:makeHeaders(token),
      });
      const result = await response.json();
      return result;
    }catch(e){
      throw e;
    }
  }
  export const getUserPublicRoutines = async (token, username) =>
  {
    try
    {
      const response = await fetch(`${BASE_URL}/users/${username}/routines`,{
        method:"GET",
        headers:makeHeaders(token),
      });
      const result = await response.json();
      return result;
    }
    catch(e)
    {
      throw e;
    }
  }

 export const getRoutines = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "GET",
      headers: makeHeaders(),
    });
    const result = await response.json();
    console.log(result)
    return result;
  } catch (error) {
    throw error;
  }
};
//fields must be name goal
export const makeRoutine = async(token, fields) =>
{
  try{
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: makeHeaders(token),
      body:JSON.stringify({ 
        ...fields
      })
    });
    const result = await response.json();
    return result;
  }
  catch(e)
  {
    throw e;
  }
}
export const updateRoutine = async(token, routineId, fields ) =>
{
  try
  {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`,  {
      method:"PATCH",
      headers: makeHeaders(token),
      body:JSON.stringify({
        ...fields
      })
    });
    const result = await response.json();
    console.log(result)
    return result;
  }catch(e)
  {
    throw e;
  }
}
export const deleteRoutine = async(token, routineId) =>
{
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method:"DELETE",
      headers:makeHeaders(token),
      body:JSON.stringify({
        routineId: routineId
      })
    });
    const result = await response.json();
    console.log(result)
    return result;
  }
  catch(e)
  {
    throw e;
  }
}
//fields is count, duration, routineId, activityId
export const addActivityToRoutine = async (token, fields)=>
{
  try
  {
    const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`,{
      method:"POST",
      headers:makeHeaders(token),
      body:JSON.stringify({
        ...fields
      })
    });
    const result = await response.json();
    console.log(result)
    return result;
  }catch(e)
  {
    throw e;
  }
}
export const getAllActivities = async () =>
{
  try
  {
    const response = await fetch(`${BASE_URL}/activities`, {
      method:"GET",
      headers:makeHeaders()
    });
    const result = await response.json();
    console.log(result)
    return result;
  }
  catch(e)
  {
    throw e;
  }
}
export const getRoutinesByActivity = async(activityId) =>
{
  try{
    const response = await fetch(`${BASE_URL}/activities/${activityId}/routines`,{
      method:"GET",
      headers:makeHeaders(),
    });
    const result = await response.json();
    console.log(result)
    return result;
  }catch(e)
  {
    throw e;
  }
}

export const updateRoutineActivities = async (token, RoutineActivityId, fields)=>
{
  try
  {
    const response = await fetch(`${BASE_URL}/routine_activities/${RoutineActivityId}`,{
      method:"PATCH",
      headers:makeHeaders(token),
      body:JSON.stringify({
        ...fields
      })
    });
    const result = await response.json();
    console.log(result)
    return result;
  }
  catch(e)
  {
    throw e;
  }
}

export const deleteRoutineActivity = async (token, RoutineActivityId) =>
{
  try
  {
    const response = await fetch(`${BASE_URL}/routine_activities/${RoutineActivityId}`,{
      method:"DELETE",
      headers:makeHeaders(token),
    });
    const result = await response.json();
    console.log(result)
    return result;
  }
  catch(e)
  {
    throw e;
  }
}

