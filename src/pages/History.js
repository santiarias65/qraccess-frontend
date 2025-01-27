import { Button ,Input ,Label ,Table } from 'reactstrap';
import React ,{ useState } from 'react';
import { BACKEND_URL ,EMPTY_STRING } from '../utils/Constants';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { IoSearch } from 'react-icons/io5';

const History = () => {
    const [history, setHistory] = useState([]);

    const serachHistory = () => {
        const startDate = document.getElementsByName("pickerStart")[0].value + "T00:00:00";
        const endDate = document.getElementsByName("pickerEnd")[0].value + "T23:59:59";
        const id = document.getElementsByName("id")[0].value;

        let url = BACKEND_URL + `access/between-dates?startDate=${startDate}&endDate=${endDate}`;
        if (id !== EMPTY_STRING) {
            url += `&userId=${id}`;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setHistory(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }

    return (
        <div>
            <div className="container">
                <h2>Historial de Acceso</h2>
                <div className="row">
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <div className="container">
                            <div className="row align-items-end">
                                <div className="col-md-3">
                                    <DatePicker
                                        label="Fecha de entrada"
                                        name="pickerStart"
                                        format="YYYY-MM-DD"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <DatePicker
                                        label="Fecha de salida"
                                        name="pickerEnd"
                                        format="YYYY-MM-DD"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Label>Identificación</Label>
                                    <Input
                                        type="text"
                                        name="id"
                                        required
                                        placeholder="Ingresa la identificación"
                                    />
                                </div>
                                <div className="col-md-2">
                                    <Button color="primary" onClick={serachHistory}>
                                        <IoSearch className="me-2"/> Buscar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </LocalizationProvider>
                    <div className="col-md-12">
                        <Table striped style={{marginTop: '20px'}}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha de entrada</th>
                                <th>Fecha de salida</th>
                                <th>ID Persona</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                            </tr>
                            </thead>
                            <tbody>
                            {history.map((register) => (
                                <tr>
                                    <td>{register.id}</td>
                                    <td>{register.dateEntry}</td>
                                    <td>{register.dateExit}</td>
                                    <td>{register.person.id}</td>
                                    <td>{register.person.name}</td>
                                    <td>{register.person.lastName}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;