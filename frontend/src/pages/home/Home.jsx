import { useContext, useEffect } from "react";
import TableEmpleados from "../../components/table/Table"
import { EmpleadosContext } from "../../context/empleados/EmpleadosContext";


const Home = () => {

  const { empleados, dispatch } = useContext(EmpleadosContext)

  useEffect(() => {
    dispatch({ type: "FETCH_EMPLEADOS_START" })

    fetch(
      `http://localhost:3000/empleados`,
      {
        method: "GET"
      }
    )
      .then(response => {
  
        console.log(response)
        dispatch({ type: "FETCH_EMPLEADOS_FULFILLED", payload: response.data });
      })
      .catch(err => dispatch({ type: "FETCH_EMPLEADOS_REJECTED", payload: err.response.data }))
  }, []);


  return (
    <>
      <div>Listado de empleados</div>
      <br />

      <TableEmpleados empleados={empleados}/>

    </>
  )
}

export default Home