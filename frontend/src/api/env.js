export const cookieKey = "accessToken";
export const ENV = String(process.env.REACT_APP_ENV).trim();
export let hostNameWithoutAPI = ""
export let hostName = ""

if (ENV === "local")
  hostNameWithoutAPI = "http://localhost:8000/"
else
  hostNameWithoutAPI = `https://mern-football-shop-4ssa.onrender.com/`
hostName = `${hostNameWithoutAPI}api/v1`
console.log({ ENV, hostNameWithoutAPI })


