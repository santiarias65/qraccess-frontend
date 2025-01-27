import './App.scss';
import Navbar from './componets/Navbar';
import Sidebar from './componets/Sidebar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import History from './pages/History';
import UserList from './pages/UserList';
import Service from './pages/Service';

function App() {
  return (
    <Router>
        <Navbar />
        <div className="flex">
            <Sidebar />
            <div className="content w-100">
                <Routes>
                    <Route path="/" element={<UserList />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/services" element={<Service />} />
                </Routes>
            </div>
        </div>
    </Router>
  );
}

export default App;
