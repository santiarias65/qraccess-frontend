import './App.scss';
import Navbar from './componets/Navbar';
import Sidebar from './componets/Sidebar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import History from './pages/History';
import UserList from './pages/UserList';
import Service from './pages/Service';
import Login from './componets/Login';
import PrivateRoute from "./server/PrivateRoute";

function App() {
  return (
    <Router>
        <Navbar />
        <div className="flex">
            <Sidebar />
            <div className="content w-100">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/users" element={<UserList />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/services" element={<Service />} />
                    </Route>
                </Routes>
            </div>
        </div>
    </Router>
  );
}

export default App;
