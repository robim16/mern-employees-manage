import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    empleados: null,
    loading: false,
    error: null
}


export const EmpleadosContext = createContext(INITIAL_STATE)

const EmpleadosReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_EMPLEADOS_START":
            return {
                empleados: null,
                loading: true,
                error: null
            };
        case "FETCH_EMPLEADOS_FULFILLED":
            return {
                empleados: action.payload,
                loading: false,
                error: null
            };
        case "FETCH_EMPLEADOS_REJECTED":
            return {
                empleados: null,
                loading: false,
                error: action.payload
            };
          
    
        default:
            return state;
    }
}



export const EmpleadosContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(EmpleadosReducer, INITIAL_STATE)

    return (
        <EmpleadosContext.Provider
            value={{
                empleados:state.empleados, 
                loading:state.loading,
                error:state.error,
                dispatch
            }}
        >
            {children}
        </EmpleadosContext.Provider>
    )
}