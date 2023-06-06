import { api } from "./api";

export async function GetProfile() {

  const response = await api('GET', 'current', {
    mode: 'cors',
  })
  console.log({response})
  return response

}

export async function GetProfileById(id) {

  const response = await api('GET', `user/${id}`, {
    mode: 'cors',
  })
  console.log({response})
  return response?.user

}

export async function EditProfile(formData) {

  const response = await api('PUT', 'current', {
    mode: 'cors', formData
  })
  return response

}

export async function GetOneUser() {

  const response = await api('GET', 'user', {
    mode: 'cors',
  })
  if (!response || ("user" in response) === false) throw new Error("Missing user's data")
  const { user } = response
  return user[0]

}

