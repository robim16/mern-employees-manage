import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useState, useContext, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { EmpleadoContext } from '../../context/empleado/EmpleadoContext'


const EditEmpleado = () => {

    const location = useLocation()
    const id = location.pathname.split("/")[2]

    const { empleado,loading, dispatch } = useContext(EmpleadoContext)

    const [ Empleado, setEmpleado] = useState({
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        fechaNacimiento: empleado.fechaNacimiento,
        sexo: empleado.sexo,
        fechaIngreso: empleado.fechaIngreso,
        estrato: empleado.estrato
    })

    const handleChange = (e) => {
        setEmpleado((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }


    useEffect(async () => {
        dispatch({ type: "FETCH_EMPLEADO_START" })

        try {
            const res = await fetch(
                `http://localhost:3000/empleado/${id}`,
                {
                    method: 'GET'
                }
            );
            console.log(res);
            dispatch({ type: "FETCH_EMPLEADO_FULFILLED", payload: res.data });

        } catch (err) {
            return dispatch({ type: "FETCH_EMPLEADO_REJECTED", payload: err.response.data });
        }
    }, [id]);


    const handleClick = (e) => {
        e.preventDefault();

        dispatch({ type: "UPDATE_EMPLEADO_START" })

        fetch(
            `http://localhost:3000/empleado/${id}`,
            {
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Empleado) 
            }
        )
        .then(response => {
    
            console.log(response)
            dispatch({ type: "UPDATE_EMPLEADO_FULFILLED", payload: response.data });
        })
        .catch(err => dispatch({ type: "UPDATE_EMPLEADO_REJECTED", payload: err.response.data }))
        }

    return (
        <>
            <h1>Editar empleado</h1>

            <Container>
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formNombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control id="nombre" type="text" placeholder="Nombre" 
                                            onChange={handleChange} 
                                            value={Empleado.nombre}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formApellido">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control id="apellido" type="text" placeholder="Apellido" 
                                            onChange={handleChange} 
                                            value={Empleado.apellido}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formFechaNac">
                                        <Form.Label>Fecha de nacimiento</Form.Label>
                                        <Form.Control type="date" id="fechaNacimiento" 
                                            placeholder="Fecha nacimiento"
                                            onChange={handleChange} 
                                            value={Empleado.fechaNacimiento}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formSexo">
                                        <Form.Label>Sexo</Form.Label>
                                        <Form.Select 
                                            onChange={handleChange}
                                            value={Empleado.sexo}
                                        >
                                            <option value="masculino">Masculino</option>
                                            <option value="femenino">Femenino</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formFechaIng">
                                        <Form.Label>Fecha de ingreso</Form.Label>
                                        <Form.Control type="date" id="fechaIngreso" 
                                            placeholder="Fecha ingreso" 
                                            onChange={handleChange}
                                            value={Empleado.fechaIngreso}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formEstrato">
                                        <Form.Label>Estrato</Form.Label>
                                        <Form.Select onChange={handleChange} 
                                            id='estrato'
                                            value={Empleado.estrato}
                                        >
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
        </>
    )
}


export default EditEmpleado;