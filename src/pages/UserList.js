import React, { useState, useEffect } from 'react';
import { Table, Button, Input, FormGroup, Label, Spinner, Alert } from 'reactstrap';
import { FaUserPlus } from 'react-icons/fa';
import axios from './../config/axiosConfig';
import {BACKEND_URL} from '../utils/Constants';

const UserList = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [areas, setAreas] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [alert, setAlert] = useState({ message: '', type: '', visible: false });
    const [newUser, setNewUser] = useState({
        id: '',
        name: '',
        lastName: '',
        email: '',
        phone: '',
        area: {
            id: '',
        },
        program: {
            id: '0',
        }
    });

    useEffect(() => {
        const url = BACKEND_URL + "person/all-persons";
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
        loadAreas();
        loadPrograms();
    }, []);

    const loadAreas = async () => {
        const url = BACKEND_URL + "university/areas";
        try {
            const response = await axios.get(url);
            setAreas(response.data);
        } catch (error) {
            console.error("Error fetching areas data: ", error);
        }
    };

    const loadPrograms = async () => {
        const url = BACKEND_URL + "university/programs";
        try {
            const response = await axios.get(url);
            setPrograms(response.data);
        } catch (error) {
            console.error("Error fetching programs data: " ,error);
        }
    };

    const handleAddUser = async () => {
        setLoading(true);
        const url = BACKEND_URL + "person";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            setAlert({ message: "Usuario creado exitosamente!", type: "success", visible: true });


        } catch (error) {
            setAlert({ message: "Error al crear el usuario: " + error.message, type: "danger", visible: true });
        } finally {
            setLoading(false);
            setTimeout(() => setAlert({ message: "", type: "", visible: false }), 3000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevState => ({
            ...prevState,
            [name]: name === 'area' || name === 'program' ? { id: value } : value
        }));
    };

    return (
        <div>
            <div className="container-fluid px-3">
                <h2 className="page-title">Lista de Usuarios</h2>
                {loading && (
                    <div className="loading-overlay">
                        <Spinner color="light" style={{width: "3rem" ,height: "3rem"}}/>
                    </div>
                )}
                {alert.visible && (
                    <Alert color={alert.type} toggle={() => setAlert({...alert ,visible: false})}>
                        {alert.message}
                    </Alert>
                )}

                <div className="d-flex justify-content-between">
                    <div className="flex-grow-1 pe-4">
                        <Table striped style={{marginTop: '20px'}}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>Area</th>
                                <th>Programa</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.area.name}</td>
                                    <td>{user.program?.name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>

                    <div className="add-person">
                        <h4><u>Registrar usuario</u></h4>
                        <FormGroup>
                            <Label className="form-label-spaced">Identificación</Label>
                            <Input
                                type="text"
                                name="id"
                                required
                                placeholder="Ingresa la identificación"
                                value={newUser.id}
                                onChange={handleChange}
                            />
                            <Label className="form-label-spaced">Nombre</Label>
                            <Input
                                type="text"
                                name="name"
                                required
                                placeholder="Ingresa el nombre"
                                value={newUser.name}
                                onChange={handleChange}
                            />
                            <Label className="form-label-spaced">Apellidos</Label>
                            <Input
                                type="text"
                                name="lastName"
                                required
                                placeholder="Ingresa los apellidos"
                                value={newUser.lastName}
                                onChange={handleChange}
                            />
                            <Label className="form-label-spaced">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                required
                                placeholder="Ingresa el email"
                                value={newUser.email}
                                onChange={handleChange}
                            />
                            <Label className="form-label-spaced">Telefono</Label>
                            <Input
                                type="number"
                                name="phone"
                                required
                                placeholder="Ingresa el telefono"
                                value={newUser.phone}
                                onChange={handleChange}
                            />
                            <Label className="form-label-spaced">Área</Label>
                            <select className="form-select" name="area" onChange={handleChange} defaultValue="">
                                <option value="" disabled>Seleccionar área</option>
                                {areas.map(area => (
                                    <option key={area.id} value={area.id}>{area.name}</option>
                                ))}
                            </select>
                            {newUser.area.id === '2' && (
                                <>
                                    <Label className="form-label-spaced">Programa</Label>
                                    <select className="form-select" name="program" onChange={handleChange}
                                            defaultValue="0">
                                        <option value="0" disabled>Seleccionar programa</option>
                                        {programs.map(program => (
                                            <option key={program.id} value={program.id}>{program.name}</option>
                                        ))}
                                    </select>
                                </>
                            )}
                        </FormGroup>
                        <Button color="primary" onClick={handleAddUser} className="mt-3 w-100">
                            <FaUserPlus className="me-2"/> Agregar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;