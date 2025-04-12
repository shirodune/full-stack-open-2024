import { createContext, useReducer, useContext } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET": {
      if(!action.payload) return null
      const user = action.payload
      console.log(user);
      
      blogService.setToken(user.token);
      return user
    }
    case "CLEAR":
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(reducer, null)

  return (
    <UserContext.Provider value={[user, dispatch]} >
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const [user] = useContext(UserContext)
  return user
}

export const useLogin = () => {
  const valueAndDispatch = useContext(UserContext)
  const dispatch = valueAndDispatch[1]
  return async (payload) => {
    const user = await loginService.login(payload)
    dispatch({ type: 'SET', payload: user})
    return user
  }
}

export const useLogout = () => {
  const valueAndDispatch = useContext(UserContext)
  const dispatch = valueAndDispatch[1]
  return () => {
    dispatch({ type: 'CLEAR'})
  }
}

export const useSetUser = () => {
  const valueAndDispatch = useContext(UserContext)
  const dispatch = valueAndDispatch[1]
  return (payload) => {
    dispatch({ type: 'SET', payload})
  }
}

export default UserContext