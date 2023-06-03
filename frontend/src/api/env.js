export const cookieKey = "accessToken";
export const ENV = process.env.REACT_APP_ENV
export let hostNameWithoutAPI = ""
export let hostName = ""

// if (ENV === "local")
hostNameWithoutAPI = ENV
// else
// hostNameWithoutAPI = `https://mern-football-shop-4ssa.onrender.com/`
hostName = `${hostNameWithoutAPI}api/v1`
console.log({ hostNameWithoutAPI })


