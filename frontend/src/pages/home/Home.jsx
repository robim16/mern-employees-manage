import { useContext, useEffect, useState } from "react";
import { EmpleadosContext } from "../../context/empleados/EmpleadosContext";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import moment from "moment";
import Alert from 'react-bootstrap/Alert';



const Home = () => {

  const { empleados, dispatch } = useContext(EmpleadosContext)
  const [show, setShow] = useState(true);

  const deleteEmpleado = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:4000/empleado/${id}`,
        {
          method: 'DELETE'
        }
      )

      if (res) {
        setShow(true)
        fetchEmpleados()
      }
    } catch (error) {
      console.log(error)
    }
  }


  const getEdad = (fechaNacimiento) => {
    let hoy = new Date()
    let year = new Date(fechaNacimiento)

    let edad = hoy.getFullYear() - year.getFullYear()

    let mes = hoy.getMonth() - year.getMonth()

    if (mes < 0 || (mes === 0 && hoy.getDate() < year.getDate())) {
      edad--
    }

    return edad
  }

  const fetchEmpleados = async () => {

    dispatch({ type: "FETCH_EMPLEADOS_START" })
    try {
      const res = await axios.get(`http://localhost:4000/empleados`)

      dispatch({ type: "FETCH_EMPLEADOS_FULFILLED", payload: res.data.empleados });

    } catch (error) {
      dispatch({ type: "FETCH_EMPLEADOS_REJECTED" })
    }

  }

  useEffect(() => {

    fetchEmpleados()
  }, []);


  return (
    <>
      <div>Listado de empleados</div>

      {show && (
        <Alert variant={"success"} onClose={() => setShow(false)} dismissible>
          Se ha eliminado el empleado!
        </Alert>
      )}

      <br />

      <div className="p-2">
        <Link
          to={`/new`}
        >
          <Button type='button' variant="primary" >
            Crear</Button>
        </Link>
      </div>

     
      {
        
        empleados && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha de nacimiento</th>
                <th>Sexo</th>
                <th>Fecha de ingreso</th>
                <th>Estrato</th>
                <th>Edad</th>
                <th colSpan={3}>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <>
                {empleados.map((empleado) => (
                  <tr key={empleado._id}>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.apellido}</td>
                    <td>{moment(empleado.fechaNacimiento).format("YYYY-MM-DD")}</td>
                    <td>{empleado.sexo}</td>
                    <td>{moment(empleado.fechaIngreso).format("YYYY-MM-DD")}</td>
                    <td>{empleado.estrato}</td>
                    <td>{getEdad(empleado.fechaNacimiento)}</td>
                    <td>
                      <Link
                        to={`/${empleado._id}`}
                        key={empleado._id}
                      >
                        <Button type='button' variant="primary" >
                          Ver</Button>
                      </Link>
                    </td>
                    <td><Button type='button' variant="danger"
                      onClick={() => deleteEmpleado(empleado._id)}>Eliminar</Button>
                    </td>
                    <td>
                      <Link
                        to={`/edit/${empleado._id}`}
                        key={empleado._id}
                      >
                        <Button type='button' variant="success" >Editar</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </>
            </tbody>
          </Table>
        )



      }

    </>
  )
}

export default Home