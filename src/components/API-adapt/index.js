const BASE_URL = "localhost:3000/api/";

function makeHeaders(token){
    const header = { "Content-Type": "application/json" };
    if (token) {
      header.Authorization = `Bearer ${token}`;
    }
    return header;
}

const getRoutines = async () => {
    try {
      const response = await fetch(`${BASE_URL}routines`, {
        method: "GET",
        headers: makeHeaders(),
      });
      const result = await response.json();
      console.log(result)
      return result;
    } catch (error) {
      console.log(error);
    }
  };
getRoutines()