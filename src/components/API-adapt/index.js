const BASE_URL = "http://localhost:3000/api";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlbiIsInBhc3N3b3JkIjoiYm1vbmsxOTk2IiwiaWQiOjEwMCwiaWF0IjoxNjc5MDcyMzY3LCJleHAiOjE2Nzk2NzcxNjd9.G18E33Paa-9doh8sjR_JROxU0Qltfy_BvXL4QzSbtnU'
function makeHeaders(token){
    const header = { "Content-Type": "application/json" };
    if (token) {
      header.Authorization = `Bearer ${token}`;
    }
    return header;
}

  const register = async (username, password)=>
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
      console.log(result)
      return result;
    }
    catch(e)
    {
      throw e;
    }
  }
  const login = async (username, password) =>{

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

  const getMyUser = async (token) =>
  {
    try{
      const response = await fetch(`${BASE_URL}/users/me`, {
        method:"GET",
        headers:makeHeaders(token),
      });
      const result = await response.json();
      console.log(result)
      return result;
    }catch(e){
      throw e;
    }
  }
  const getUserPublicRoutines = async (token, username) =>
  {
    try
    {
      const response = await fetch(`${BASE_URL}/users/${username}/routines`,{
        method:"GET",
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

const getRoutines = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "GET",
      headers: makeHeaders(),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

const makeRoutine = async(token, fields) =>
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
    console.log(result)
    return result;
  }
  catch(e)
  {
    throw e;
  }
}

const updateRoutine = async(token, routineId, fields ) =>
{
  try
  {
    const response = await fetch(`${BASE_URL}/${routineId}`,  {
      method:"POST",
      headers: makeHeaders(token),
      body:{
        ...fields
      }
    });
    const result = await response.json();
    return result;
  }catch(e)
  {
    throw e;
  }
}

const deleteRoutine = async(token, routineId) =>
{
  try {
    const response = await fetch(`${BASE_URL}/${routineId}`, {
      method:"DELETE",
      headers:makeHeaders(token),
      body:{
        routineId: routineId
      }
    });
    const result = await response.json();
    return result;
  }
  catch(e)
  {
    throw e;
  }
}

const addActivityToRoutine = async (token, routineId, activityId)=>
{
  try
  {
    const response = await fetch(`${BASE_URL}/${routineId}`,{
      method:"POST",
      headers:makeHeaders(token),
      body:{
        routineId:routineId,
        activityId:activityId
      }
    });
    const result = await response.json();
    return result;
  }catch(e)
  {
    throw e;
  }
}

const getAllActivities = async () =>
{
  try
  {
    const response = await fetch(`${BASE_URL}/activities`, {
      method:"GET",
      headers:makeHeaders()
    });
    const result = await response.json();
    return result;
  }
  catch(e)
  {
    throw e;
  }
}

const getRoutinesByActivity = async(activityId) =>
{
  try{
    const response = await fetch(`${BASE_URL}/${activityId}/routines`,{
      method:"GET",
      headers:makeHeaders(),
    });
    const result = await response.json();
    return result;
  }catch(e)
  {
    throw e;
  }
}

const updateRoutineActivities = async (token, RoutineActivityId, fields)=>
{
  try
  {
    const response = await fetch(`${BASE_URL}/${RoutineActivityId}`,{
      method:"POST",
      headers:makeHeaders(token),
      body:{
        ...fields
      }
    });
    const result = response.json();
    return result;
  }
  catch(e)
  {
    throw e;
  }
}