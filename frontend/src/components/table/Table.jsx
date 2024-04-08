
import Table from 'react-bootstrap/Table';
import { EmpleadosContext } from '../../context/empleados/EmpleadosContext';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

const TableEmpleados = (empleados) => {

    const deleteEmpleado = async (id) => {
        try {
            const res = await fetch(
                `http://localhost:3000/empleado/${id}`,
                {
                    method:DELETE
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    const getEdad = (fechaNacimiento) => {
        let hoy = new Date()
        let year = new Date(fechaNacimiento)

        let edad = hoy.getFullYear() - year.getFullYear()

        let mes = hoy.getMonth() - year.getMonth()

        if (m < 0 || (m === 0 && hoy.getDate() < year.getDate())) {
            edad--
        }

        return edad
    }


    return (
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
                {empleados.map((empleado, i) => (
                    <tr key={empleado._id}>
                        <td>{empleado.nombre}</td>
                        <td>{empleado.apellido}</td>
                        <td>{empleado.fechaNacimiento}</td>
                        <td>{empleado.sexo}</td>
                        <td>{empleado.fechaIngreso}</td>
                        <td>{empleado.estrato}</td>
                        <td>{ getEdad(empleado.fechaNacimiento)}</td>
                        <td>
                            <Link 
                                to={`/${empleado._id}`}
                                key={i}
                            >
                                <button  type='button' variant="primary" >Ver</button>
                            </Link>
                        </td>
                        <td><Button type='button' variant="danger" 
                            onClick={deleteEmpleado(_id)}>Eliminar</Button>
                        </td>
                        <td>
                            <Link 
                                to={`/edit/${empleado._id}`}
                                key={i}
                            >
                                <Button  type='button' variant="success" >Editar</Button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default TableEmpleados