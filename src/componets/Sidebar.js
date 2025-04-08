import { NavLink } from 'react-router-dom';
import { FaUser ,FaHistory ,FaSignOutAlt } from "react-icons/fa";
import { GrServices } from 'react-icons/gr';
import { Button } from "reactstrap";


const Sidebar = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <div className="sidebar bg-light">
            <ul>
                <li>
                    <NavLink to="/users" className="text-dark rounded py-2 w-100 d-inline-block px-3"
                             activeClassname="active">
                        <FaUser className="me-2"/> Usuarios
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/history" className="text-dark rounded py-2 w-100 d-inline-block px-3"
                             activeClassname="active">
                        <FaHistory className="me-2"/> Historial
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/services" className="text-dark rounded py-2 w-100 d-inline-block px-3"
                             activeClassname="active">
                        <GrServices className="me-2"/> Servicios
                    </NavLink>
                </li>
                <li>
                    <Button color="none" className="w-100 text-start px-3 py-2 rounded" onClick={handleLogout}>
                        <FaSignOutAlt className="me-2"/> Salir
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;