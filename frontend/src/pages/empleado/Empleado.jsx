import { useLocation } from "react-router-dom";
import { EmpleadoContext } from "../../context/empleado/EmpleadoContext";
import Letras from "../../components/letras/Letras";

const Empleado = () => {

  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const { empleado, dispatch } = useContext(EmpleadoContext)

  useEffect(async () => {
    dispatch({ type: "FETCH_EMPLEADO_START" })

    try {
      const res = await fetch(
        `http://localhost:3000/empleado/${id}`,
        {
          method: GET
        }
      );
      console.log(res);
      dispatch({ type: "FETCH_EMPLEADO_FULFILLED", payload: res.data });

    } catch (err) {
      return dispatch({ type: "FETCH_EMPLEADO_REJECTED", payload: err.response.data });
    }
  }, [id]);

  return (
    <div>
      Empleado: {empleado.nombre} {empleado.apellido}

      <TableEmpleados empleado={empleado} />
      <Letras nombre={empleado.nombre + empleado.apellido}/>
    </div>
  )
}


export default Empleado