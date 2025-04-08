import React, { useState } from "react";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Container,
    Card,
    CardBody
} from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/Constants";

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: "", type: "", visible: false });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({ message: "", type: "", visible: false });
        const url = BACKEND_URL + "auth/login";

        try {
            const response = await axios.post(url, credentials);
            localStorage.setItem("token", response.data.token);
            setAlert({ message: "Inicio de sesión exitoso", type: "success", visible: true });
            setTimeout(() => navigate("/users"), 1000);
        } catch (error) {
            setAlert({ message: "Credenciales incorrectas", type: "danger", visible: true });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Card
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "1rem",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    padding: "30px"
                }}
            >
                <CardBody>
                    <h2 className="text-center mb-4 fw-bold">🔐 QR access</h2>
                    {alert.visible && <Alert color={alert.type}>{alert.message}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <Label className="fw-semibold">Usuario</Label>
                            <Input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Ingresa tu usuario"
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="fw-semibold">Contraseña</Label>
                            <Input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="********"
                                required
                            />
                        </FormGroup>
                        <Button
                            color="primary"
                            block
                            disabled={loading}
                            style={{
                                borderRadius: "8px",
                                fontWeight: "600",
                                marginTop: "15px"
                            }}
                        >
                            {loading ? "Cargando..." : "Iniciar sesión"}
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default Login;
