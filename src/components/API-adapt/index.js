const BASE_URL = "localhost:3000/api";

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
        body:{
          username:username,
          password:password
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

  const login = async (username, password) =>{

    try{
      const response = await fetch(`${BASE_URL}/users/login`,{
        method:"POST",
        headers: makeHeaders(),
        body:{
          username:username,
          password:password
        }
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
      return result;
    }catch(e){
      throw e;
    }
  }

  const getMyRoutines = async (token, username) =>
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

  const getUserPublicRoutines = async (username) =>
  {
    try
    {
      const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
        method:"GET",
        headers:makeHeaders(),
      });
      const result = await response.json();
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
      header:makeHeaders()
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
