import { api } from "./api";

export async function GetProfile() {
    
    const response = await api('GET', 'current', {
        mode: 'cors',
      })
    console.log({ response })
    return response

}

export async function EditProfile(body) {
    
    const response = await api('PUT', 'current', {
        mode: 'cors', body
      })
    console.log({ response })
    return response

}

  
  
