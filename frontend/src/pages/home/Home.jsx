import { useContext, useEffect, useState } from "react";
import { EmpleadosContext } from "../../context/empleados/EmpleadosContext";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import moment from"moment";



const Home = () => {

  const { empleados, dispatch } = useContext(EmpleadosContext)


  const deleteEmpleado = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:4000/empleado/${id}`,
        {
          method: 'DELETE'
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const formatDate = (date) => {
    const fecha = moment(date, "MM/DD/YYYY");
    return fecha
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

  useEffect(() => {
    const fetchEmpleados = async () => {

      dispatch({ type: "FETCH_EMPLEADOS_START" })
      try {
        const res = await axios.get(`http://localhost:4000/empleados`)

        dispatch({ type: "FETCH_EMPLEADOS_FULFILLED", payload: res.data.empleados });

      } catch (error) {
        dispatch({ type: "FETCH_EMPLEADOS_REJECTED" })
      }

    }

    fetchEmpleados()
  }, []);


  return (
    <>
      <div>Listado de empleados</div>
      <br />
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
                    <td>{empleado.fechaNacimiento}</td>
                    <td>{empleado.sexo}</td>
                    <td>{empleado.fechaIngreso}</td>
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