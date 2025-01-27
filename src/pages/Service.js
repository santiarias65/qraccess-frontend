import React ,{ useState } from 'react';
import { Button ,Input ,Label ,Table } from 'reactstrap';
import { IoSearch } from 'react-icons/io5';
import { BACKEND_URL } from '../utils/Constants';
import axios from 'axios';

const Service = () => {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState({});

    const handleChange = (e) => {
        const { value } = e.target;
        setUserId(value);
    }

    const searchUser = () => {
        const url = BACKEND_URL + `person/${userId}`;

        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setUser(response.data);
            } catch (error) {
                setUser({});
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();

    }

    return (
        <div>
            <div className="container">
                <h2>Consultar codigo QR</h2>
                <div className="row align-items-end">
                    <div className="col-md-4">
                        <Label>Identificación</Label>
                        <Input
                            type="text"
                            name="id"
                            required
                            placeholder="Ingresa la identificación"
                            value={userId}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <Button color="primary" onClick={searchUser}>
                            <IoSearch className="me-2"/> Buscar
                        </Button>
                    </div>
                    <div className="col-md-2">
                        <Button color="success" onClick={searchUser}>
                            <IoSearch className="me-2"/> Generar nuevo QR
                        </Button>
                    </div>
                    <div className="col-md-2">
                        <Button color="danger" onClick={searchUser}>
                            <IoSearch className="me-2"/> Eliminar acceso
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
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
                            {Object.keys(user).length > 0 && (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.area.name}</td>
                                    <td>{user.program.name}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service;