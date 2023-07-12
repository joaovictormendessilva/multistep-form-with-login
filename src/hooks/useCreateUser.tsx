import { useState } from "react";
import { NewUser } from "../interfaces/NewUser";
import { MessageProps } from "../interfaces/Message";
import { api } from "../services/axios";


export function useCreateUser() {
  const [changeNewUser, setChangeNewUser] = useState<NewUser>({} as NewUser);
  const [message, setMessage] = useState<MessageProps>({} as MessageProps)

  const handleCreateUser = async () => {
    if (
      changeNewUser.email &&
      changeNewUser.username &&
      changeNewUser.password &&
      changeNewUser.confirmPassword
    ) {
      if (changeNewUser.password === changeNewUser.confirmPassword) {
        await api.post(`/nova-conta/`, {
          Username: changeNewUser.username,
          Email: changeNewUser.email,
          Password: changeNewUser.password,
          ConfirmPassword: changeNewUser.confirmPassword,
        }, {
          headers: {
            "Content-Type": 'application/json'
          }
        })
          .then((response) => {

            if (response.data.StatusCode === 200) {
              setMessage((prevValue) => ({
                ...prevValue,
                message: response.data.Message,
                type: response.data.StatusCode
              }))
            }

            setChangeNewUser((prevValue) => ({
              ...prevValue,
              username: '',
              email: '',
              password: '',
              confirmPassword: ''
            }))

          })
          .catch((error) => {
            console.log(error.response.data)
            if (error.response.data.StatusCode === 406) {
              setMessage((prevValue) => ({
                ...prevValue,
                message: error.response.data.Message,
                type: error.response.data.StatusCode
              }))
            }
          });
      }
      else {
        alert("As senhas não são iguais!");
      }
    }
    else {
      alert("Todos os campos são obrigatórios");
    }
  };

  return { changeNewUser, setChangeNewUser, message, handleCreateUser }
}