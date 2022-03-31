import { createContext, FC, useContext, useEffect, useReducer } from "react";
import { StateType, ActionType, authReducer } from "./authReducer";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('user') as string) || null,
};

const defaultDispatch: React.Dispatch<ActionType> = () => initialState; // we never actually use this
const AuthContext = createContext({
  state: initialState,
  dispatch: defaultDispatch, 
});

export const AuthContextProvider : FC = ({children})=>{
    const [state, dispatch] = useReducer(authReducer, initialState);

    return ( 
      <AuthContext.Provider 
            value={{ state, dispatch }}>
        {children}
      </AuthContext.Provider>)
}

export const useAuthContext = () => useContext(AuthContext) 