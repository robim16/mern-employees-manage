import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    empleado: {
        nombre: null,
        apellido: null,
        fechaNacimiento: null,
        sexo: null,
        fechaIngreso: null,
        estrato: null
    },
    loading: false,
    error: null
}


export const EmpleadoContext = createContext(INITIAL_STATE)

const EmpleadoReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_EMPLEADO_START":
            return {
                empleado: null,
                loading: true,
                error: null
            };
        case "FETCH_EMPLEADO_FULFILLED":
            return {
                empleado: {
                    nombre: action.payload.nombre,
                    apellido: action.payload.apellido,
                    fechaNacimiento: action.payload.fechaNacimiento,
                    sexo: action.payload.sexo,
                    fechaIngreso: action.payload.fechaIngreso,
                    estrato: action.payload.estrato
                },
                loading: false,
                error: null
            };
        case "FETCH_EMPLEADO_REJECTED":
            return {
                empleado: null,
                loading: false,
                error: action.payload
            };
        case "SAVE_EMPLEADO_START":
            return {
                loading: true,
                error: null
            };
        case "SAVE_EMPLEADO_FULFILLED":
            return {
                loading: false,
                error: null
            };
        case "SAVE_EMPLEADO_REJECTED":
            return {
                loading: false,
                error: action.payload
            };
        case "UPDATE_EMPLEADO_START":
            return {
                loading: true,
                error: null
            };
        case "UPDATE_EMPLEADO_FULFILLED":
            return {
                loading: false,
                error: null
            };
        case "UPDATE_EMPLEADO_REJECTED":
            return {
                loading: false,
                error: action.payload
            };
          
    
        default:
            return state;
    }
}



export const EmpleadoContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(EmpleadoReducer, INITIAL_STATE)

    return (
        <EmpleadoContext.Provider
            value={{
                empleados:state.empleados, 
                loading:state.loading,
                error:state.error,
                dispatch
            }}
        >
            {children}
        </EmpleadoContext.Provider>
    )
}