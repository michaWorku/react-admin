export interface StateType{
    currentUser : any,
}

export type ActionType =
  | { type: "LOGIN", payload: any}
  | { type: "LOGOUT" }

export const authReducer  = (state: StateType , action : ActionType)=>{
    switch (action.type) {
        case 'LOGIN': {
            localStorage.setItem('user', JSON.stringify(action.payload))
            return {
                currentUser: action.payload
            }
        }
            
        case 'LOGOUT':{
            localStorage.removeItem('user')
            return {
                currentUser : null
            }
        }   

        default:
            return state
    }
}