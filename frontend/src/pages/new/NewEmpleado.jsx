import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useState, useContext} from 'react'
import { EmpleadoContext } from '../../context/empleado/EmpleadoContext'



const NewEmpleado = () => {

    const [ Empleado, setEmpleado] = useState({
        nombre: undefined,
        apellido: undefined,
        fechaNacimiento: undefined,
        sexo: undefined,
        fechaIngreso: undefined,
        estrato: undefined
    })

    const { loading, dispatch } = useContext(EmpleadoContext)

    const handleChange = (e) => {
        setEmpleado((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }


    const handleClick = (e) => {
        e.preventDefault();

        dispatch({ type: "SAVE_EMPLEADO_START" })

        fetch(
            `http://localhost:3000/empleados`,
            {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Empleado) 
            }
        )
        .then(response => {
    
            console.log(response)
            dispatch({ type: "SAVE_EMPLEADO_FULFILLED", payload: response.data });
        })
        .catch(err => dispatch({ type: "SAVE_EMPLEADO_REJECTED", payload: err.response.data }))
        }

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control id="nombre" type="text" placeholder="Nombre" onChange={handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formApellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control id="apellido" type="text" placeholder="Apellido" onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formFechaNac">
                                    <Form.Label>Fecha de nacimiento</Form.Label>
                                    <Form.Control type="date" id="fechaNacimiento" placeholder="Fecha nacimiento" onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formSexo">
                                    <Form.Label>Sexo</Form.Label>
                                    <Form.Select onChange={handleChange}>
                                        <option value="masculino">Masculino</option>
                                        <option value="femenino">Femenino</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formFechaIng">
                                    <Form.Label>Fecha de ingreso</Form.Label>
                                    <Form.Control type="date" id="fechaIngreso" placeholder="Fecha ingreso" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEstrato">
                                    <Form.Label>Estrato</Form.Label>
                                    <Form.Select onChange={handleChange} id='estrato'>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </Form.Select>
                                </Form.Group>
                                <Button variant="primary" type="submit" 
                                    onClick={handleClick}
                                    disabled={loading}
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}


export default NewEmpleado