import { useState, useContext, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from 'axios'


const Empleado = () => {

  const location = useLocation()
  const id = location.pathname.split("/")[1]

  const [Empleado, SetEmpleado] = useState('')


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

    const fetchEmpleado = async () => {

      try {
        const res = await axios.get(`http://localhost:4000/empleado/${id}`)

        SetEmpleado(res.data.empleado)

      } catch (error) {
        console.log(error)
      }

    }

    fetchEmpleado()

  }, [id]);

  return (
    <div>
      <> 
        { Empleado && (
          <> 
            <br />

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
                </tr>
              </thead>
              <tbody>
                <>
                  
                  <tr key={Empleado[0]._id}>
                    <td>{Empleado[0].nombre}</td>
                    <td>{Empleado[0].apellido}</td>
                    <td>{Empleado[0].fechaNacimiento}</td>
                    <td>{Empleado[0].sexo}</td>
                    <td>{Empleado[0].fechaIngreso}</td>
                    <td>{Empleado[0].estrato}</td>
                    <td>{getEdad(Empleado[0].fechaNacimiento)}</td>
                  </tr>
                
                </>
              </tbody>
            </Table>
          </>
        )}


        {/* <Letras nombre={empleado.nombre + empleado.apellido}/>  */}
      </>
    </div>
  )
}


export default Empleado