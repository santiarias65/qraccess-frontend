import React, { useState, useEffect } from 'react';
import { Table, Button, Input, FormGroup, Label } from 'reactstrap';
import { FaUserPlus } from 'react-icons/fa';
import axios from "axios";
import {BACKEND_URL} from "../utils/Constants";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        id: "",
        name: "",
        lastName: "",
        email: "",
        phone: "",
        area: {
            id: "",
            name: ""
        },
        program: {
            id: "",
            name: ""
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
    }, []);

    const handleAddUser = () => {
        console.log("newUser: ", newUser);
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
            <div className="container-xxl">
                <h2>Lista de Usuarios</h2>
                <div className="row">
                    <div className="col-md-10">
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
                                    <td>{user.program.name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-md-2">
                        <FormGroup style={{marginBottom: '16px'}}>
                            <Label>Identificación</Label>
                            <Input
                                type="text"
                                name="id"
                                required
                                placeholder="Ingresa la identificación"
                                value={newUser.id}
                                onChange={handleChange}
                            />
                            <Label>Nombre</Label>
                            <Input
                                type="text"
                                name="name"
                                required
                                placeholder="Ingresa el nombre"
                                value={newUser.name}
                                onChange={handleChange}
                            />
                            <Label>Apellidos</Label>
                            <Input
                                type="text"
                                name="lastName"
                                required
                                placeholder="Ingresa los apellidos"
                                value={newUser.lastName}
                                onChange={handleChange}
                            />
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                required
                                placeholder="Ingresa el email"
                                value={newUser.email}
                                onChange={handleChange}
                            />
                            <Label>Telefono</Label>
                            <Input
                                type="number"
                                name="phone"
                                required
                                placeholder="Ingresa el telefono"
                                value={newUser.phone}
                                onChange={handleChange}
                            />
                            <Label>Area</Label>
                            <select className="form-select" name="area" onChange={handleChange}>
                                <option selected>Seleccionar area</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <Label>Programa</Label>
                            <select className="form-select" name="program" onChange={handleChange}>
                                <option selected>Seleccionar programa</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </FormGroup>
                        <Button color="primary" onClick={handleAddUser}>
                            <FaUserPlus className="me-2"/> Agregar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;