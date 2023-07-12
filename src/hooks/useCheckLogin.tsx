import { useState } from "react"
import { MessageProps } from "../interfaces/Message"
import { User } from "../interfaces/User"
import { useAuthContext } from "../contexts/AuthContext"
import { api } from '../services/axios'

export function useCheckLogin() {

  const { setIsLogged } = useAuthContext()

  const [userData, setUserData] = useState({
    username: "",
    password: ""
  })
  const [user, setUser] = useState<User>({} as User);
  const [message, setMessage] = useState<MessageProps>({} as MessageProps)

  const handleCheckLogin = async () => {

    if (userData.username && userData.password) {

      await api.post(`/entrar/`, {
        Username: userData.username,
        Password: userData.password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          if (response.status === 200) {
            setMessage((prevValue) => ({
              ...prevValue,
              message: response.data.Message,
              type: response.data.StatusCode
            }))

            setUser((prevValue) => ({
              ...prevValue,
              username: userData.username,
              securityToken: response.data.SecurityToken,
              expiration: response.data.Expiration
            }))

            setInterval(() => {
              setIsLogged(true)
            }, 1000)

          }
        })
        .catch((error) => {
          if (error.response.data.StatusCode === 401) {
            setMessage((prevValue) => ({
              ...prevValue,
              message: error.response.data.Message,
              type: error.response.data.StatusCode
            }))
          }
        })
    }
    else {
      setMessage((prevValue) => ({
        ...prevValue,
        message: "Os campos são obrigatórios!",
        type: 422
      }))
    }
  }

  return { setUserData, user, message, handleCheckLogin }
}