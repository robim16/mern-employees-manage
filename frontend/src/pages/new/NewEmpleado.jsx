import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react'
import { Link } from 'react-router-dom'



const NewEmpleado = () => {

    const [ Empleado, setEmpleado] = useState({
        nombre: undefined,
        apellido: undefined,
        fechaNacimiento: undefined,
        sexo: undefined,
        fechaIngreso: undefined,
        estrato: undefined
    })


    const [show, setShow] = useState(false);

    const [error, setError] = useState(false);


    const handleChange = (e) => {
        setEmpleado((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }


    const handleClick = (e) => {
        e.preventDefault();

        if  (Empleado.nombre !== undefined && Empleado.apellido !== undefined
                && Empleado.estrato !== undefined && Empleado.fechaIngreso !== undefined
                && Empleado.fechaNacimiento != undefined && Empleado.sexo != undefined
            ) {
            fetch(
                `http://localhost:4000/empleado`,
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
        
               setShow(true)
               
            })
            .catch(err => console.log(err))
        }
        else{
            setError(true)
        }
       
    }

    return (
        <>
            {show && (
                <Alert variant={"success"} onClose={() => setShow(false)} dismissible>
                    Se ha creado el empleado!
                </Alert>
            )}

            <br />

            {error && (
                <Alert variant={"danger"} onClose={() => setError(false)} dismissible>
                    todos los campos son obligatorios!
                </Alert>
            )}

            <Container>
                <Row className='justify-content-center'>
                    <Col md={4}>
                        <div className='p-3'>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Crear empleado</Card.Title>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control id="nombre" type="text" placeholder="Nombre" onChange={handleChange}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Apellido</Form.Label>
                                            <Form.Control id="apellido" type="text" placeholder="Apellido" onChange={handleChange}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Fecha de nacimiento</Form.Label>
                                            <Form.Control type="date" id="fechaNacimiento" placeholder="Fecha nacimiento" onChange={handleChange}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Sexo</Form.Label>
                                            <Form.Select onChange={handleChange} id="sexo">
                                                <option value="">Seleccione</option>
                                                <option value="masculino">Masculino</option>
                                                <option value="femenino">Femenino</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Fecha de ingreso</Form.Label>
                                            <Form.Control type="date" id="fechaIngreso" placeholder="Fecha ingreso" onChange={handleChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Estrato</Form.Label>
                                            <Form.Select onChange={handleChange} id='estrato'>
                                                <option value="">Seleccione</option>
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
                                        >
                                            Crear Empleado
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>

                            <div className='p-2'>
                                <Link
                                    to={`/`}
                                >
                                <Button type='button' variant="warning" >
                                    Regresar</Button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            
        </>
    )
}


export default NewEmpleado