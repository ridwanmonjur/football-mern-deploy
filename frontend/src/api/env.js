export const localStorageKey = '__user_token__';
export const cookieKey = 'signInToken';
export const DEVELOP = process.env.REACT_APP_DEVELOP;
export const LOCALHOST = process.env.REACT_APP_LOCALHOST === 'true';
console.log({DEVELOP, LOCALHOST})
export let hostNameWithoutAPI = LOCALHOST ? "http://localhost:8000/" : (DEVELOP ? "https://football-mern-shop-development.up.railway.app/" : "https://football-mern-shop.up.railway.app/" );
export let hostName = DEVELOP ? `${hostNameWithoutAPI}api/v1` : `${hostNameWithoutAPI}api/v1`;
