import React ,{ useState } from 'react';
import { Button ,Input ,Label ,Table, Alert } from 'reactstrap';
import { IoSearch } from 'react-icons/io5';
import { BACKEND_URL } from '../utils/Constants';
import axios from './../config/axiosConfig';

const Service = () => {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState({});
    const [alert, setAlert] = useState({ message: '', type: '', visible: false });

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

    const newQRCode = async () => {
        const url = BACKEND_URL + `access/update/${userId}`;

        try {
            const response = await axios.put(url);
            if (response.status === 200) {
                setAlert({ message: "Identidad virtual generada correctamente", type: "success", visible: true });
            }
        } catch (error) {
            setAlert({ message: "Error al generar una nueva identidad virtual: ", type: "danger", visible: true });
        }
    }

    const deleteQRCode = async () => {
        const url = BACKEND_URL + `access/delete/${userId}`;

        try {
            const response = await axios.delete(url);
            if (response.status === 200) {
                setAlert({ message: "Acceso eliminado correctamente", type: "info", visible: true });
            }
        } catch (error) {
            setAlert({message: "Error al eliminar el acceso: " ,type: "danger" ,visible: true});
        }
    }

    return (
        <div>
            <div className="container">
                <h2 className="page-title">Servicios del codigo QR</h2>
                {alert.visible && (
                    <Alert color={alert.type} toggle={() => setAlert({ ...alert, visible: false })}>
                        {alert.message}
                    </Alert>
                )}
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
                    {user.id && (
                        <>
                            <div className="col-md-2">
                                <Button color="success" onClick={newQRCode}>
                                    <IoSearch className="me-2"/> Generar nuevo QR
                                </Button>
                            </div>
                            <div className="col-md-2">
                                <Button color="danger" onClick={deleteQRCode}>
                                    <IoSearch className="me-2"/> Eliminar acceso
                                </Button>
                            </div>
                        </>

                    )}
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
                                    <td>{user.area?.name}</td>
                                    <td>{user.program?.name}</td>
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