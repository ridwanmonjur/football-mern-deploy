export const cookieKey = process.env.COOKIE_NAME;
export const ENV = process.env.REACT_APP_ENV;
export let hostNameWithoutAPI = ""
export let hostName=""
switch(ENV) {
    case "local":
        hostNameWithoutAPI = "http://localhost:8000/"
      break;
    case "develop":
        hostNameWithoutAPI = "https://football-mern-shop-development.up.railway.app/"
      break;
    case "production":
        hostNameWithoutAPI = "https://football-mern-shop.up.railway.app/"
      break;
    default:
        hostNameWithoutAPI = "https://football-mern-shop.up.railway.app/"
  }
hostName=`${hostNameWithoutAPI}api/v1`


