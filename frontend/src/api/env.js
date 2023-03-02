export const localStorageKey = '__user_token__'
export const cookieKey = 'signInToken'
export const DEVELOP = Boolean(process.env.DEVELOP)
export const hostName= DEVELOP ? "https://football-mern-shop.up.railway.app/api/v1" : "https://football-mern-shop-development.up.railway.app/api/v1"
export const hostNameWithoutAPI= DEVELOP ? "https://football-mern-shop.up.railway.app/" :  "https://football-mern-shop-development.up.railway.app/" 
