import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectRole from "./Components/SelectRole";
import Login from "./Components/LoginForm";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import StudentList from "./Pages/Admin/ViewStudentDetails";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* <Route path="/" element={<Login />} /> */}
                    <Route path="/" element={<SelectRole />} />

                    <Route path="/login/:role" element={<Login />} />
                    <Route path="/:role/admin-dashboard" element={<AdminDashboard />} />
                    
                    <Route path="/students-lists" element={<StudentList />} />

                </Routes>
            </Router>
        </div>
    );
}

export default App;
