export const cookieKey = process.env.COOKIE_NAME;
export const ENV = process.env.REACT_APP_ENV;
export let hostNameWithoutAPI = ""
export let hostName=""
const hostNamePart = new Date.getDate()>15 ? "football-mern-shop2" : "football-mern-shop"

switch(ENV) {
    case "local":
        hostNameWithoutAPI = "http://localhost:8000/"
      break;
    case "develop":
        hostNameWithoutAPI = `https://${hostNamePart}-development.up.railway.app/`
      break;
    case "production":
        hostNameWithoutAPI = `https://${hostNamePart}.up.railway.app/`
      break;
    default:
        hostNameWithoutAPI = `https://${hostNamePart}.up.railway.app/`
  }
hostName=`${hostNameWithoutAPI}api/v1`


