import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    empleados: null,
    loading: false,
    error: null
}


export const EmpleadoContext = createContext(INITIAL_STATE)

const EmpleadoReducer = (state, action) => {
    switch (action.type) {
        case "":
            
            break;
    
        default:
            break;
    }
}



export const EmpleadoContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(EmpleadoReducer, INITIAL_STATE)

    return (
        <EmpleadoContext.Provider>
            {children}
        </EmpleadoContext.Provider>
    )
}