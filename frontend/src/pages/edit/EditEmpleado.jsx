import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useState, useContext, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import axios from 'axios'
import moment from 'moment'


const EditEmpleado = () => {

    const location = useLocation()
    const id = location.pathname.split("/")[2]


    const [show, setShow] = useState(false);

    const [error, setError] = useState(false);

    const [Empleado, setEmpleado] = useState({
        _id: undefined,
        nombre: undefined,
        apellido: undefined,
        fechaNacimiento: undefined,
        sexo: undefined,
        fechaIngreso: undefined,
        estrato: undefined
    })

    const handleChange = (e) => {
        setEmpleado((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }


    useEffect(() => {

        const fetchEmpleado = async () => {

            await axios.get(`http://localhost:4000/empleado/${id}`)
                .then(function (res) {

                    setEmpleado({ ...res.data.empleado[0] })

                    console.log(res.data.empleado[0]);
                })
                .catch(function (error) {
                    console.log(error);
                })

        }

        fetchEmpleado()

    }, [id]);


    const handleClick = (e) => {
        e.preventDefault();

        if (Empleado.nombre !== undefined && Empleado.apellido !== undefined
            && Empleado.estrato !== undefined && Empleado.fechaIngreso !== undefined
            && Empleado.fechaNacimiento !== undefined && Empleado.sexo !== undefined) {

            fetch(
                `http://localhost:4000/empleado/${id}`,
                {
                    method: "PUT",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(Empleado)
                }
            )
                .then(res => {
                    setShow(true)
                })
                .catch(err => console.log(err))

        } else {
            setError(true)
        }


    }

    return (
        <>
            <h3>Editar empleado</h3>

            {show && (
                <Alert variant={"success"} onClose={() => setShow(false)} dismissible>
                    Se ha editado el empleado!
                </Alert>
            )}

            <br />

            {error && (
                <Alert variant={"danger"} onClose={() => setError(false)} dismissible>
                    todos los campos son obligatorios!
                </Alert>
            )}

            {Empleado && (
                <Container>
                    <Row className='justify-content-center'>
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control id="nombre" type="text" placeholder="Nombre"
                                                onChange={handleChange}
                                                value={Empleado.nombre}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Apellido</Form.Label>
                                            <Form.Control id="apellido" type="text" placeholder="Apellido"
                                                onChange={handleChange}
                                                value={Empleado.apellido}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Fecha de nacimiento</Form.Label>
                                            <Form.Control type="date" id="fechaNacimiento"
                                                placeholder="Fecha nacimiento"
                                                onChange={handleChange}
                                                value={moment(Empleado.fechaNacimiento).format("YYYY-MM-DD")}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Sexo</Form.Label>
                                            <Form.Select
                                                onChange={handleChange}
                                                value={Empleado.sexo}
                                                id='sexo'
                                            >
                                                <option value="">Seleccione</option>
                                                <option value="masculino">Masculino</option>
                                                <option value="femenino">Femenino</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Fecha de ingreso</Form.Label>
                                            <Form.Control type="date" id="fechaIngreso"
                                                placeholder="Fecha ingreso"
                                                onChange={handleChange}
                                                value={moment(Empleado.fechaIngreso).format("YYYY-MM-DD")}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Estrato</Form.Label>
                                            <Form.Select onChange={handleChange}
                                                id='estrato'
                                                value={Empleado.estrato}
                                            >
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
                                            Editar
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

                        </Col>
                    </Row>
                </Container>
            )}

        </>
    )
}


export default EditEmpleado;