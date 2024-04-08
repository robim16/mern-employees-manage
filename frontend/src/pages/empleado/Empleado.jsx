import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Letras from '../../components/letras/Letras'
import moment from 'moment';


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

      await axios.get(`http://localhost:4000/empleado/${id}`)
        .then(function (res) {

          SetEmpleado(res.data.empleado[0])

          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        })

    }

    fetchEmpleado()

  }, [id]);

  return (
    <div>
      <>
        {Empleado && (
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

                  <tr key={Empleado._id}>
                    <td>{Empleado.nombre}</td>
                    <td>{Empleado.apellido}</td>
                    <td>{moment(Empleado.fechaNacimiento).format("YYYY-MM-DD")}</td>
                    <td>{Empleado.sexo}</td>
                    <td>{moment(Empleado.fechaIngreso).format("YYYY-MM-DD")}</td>
                    <td>{Empleado.estrato}</td>
                    <td>{getEdad(Empleado.fechaNacimiento)}</td>
                  </tr>

                </>
              </tbody>
            </Table>
          </>
        )}


        <Letras empleado={Empleado} />


        <div className='p-2'>
          <Link
            to={`/`}
          >
            <Button type='button' variant="warning" >
              Regresar</Button>
          </Link>
        </div>
      </>
    </div>
  )
}


export default Empleado