export const cookieKey = "accessToken";
export const ENV = String(process.env.REACT_APP_ENV).trim();
console.log({ENV})
export let hostNameWithoutAPI = ""
export let hostName=""

switch(ENV) {
    case "local":
        hostNameWithoutAPI = "http://localhost:8000/"
      break;
    case "production":
        hostNameWithoutAPI = `https://mern-football-shop-4ssa.onrender.com/`
      break;
    default:
        hostNameWithoutAPI = `https://mern-football-shop-4ssa.onrender.com/`
  }
hostName=`${hostNameWithoutAPI}api/v1`


