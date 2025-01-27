import { NavLink } from 'react-router-dom';
import { FaUser, FaHistory } from "react-icons/fa";
import { GrServices } from 'react-icons/gr';


const Sidebar = () => {
    return (
        <div className="sidebar bg-light">
            <ul>
                <li>
                    <NavLink to="/" className="text-dark rounded py-2 w-100 d-inline-block px-3"
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
            </ul>
        </div>
    );
}

export default Sidebar;