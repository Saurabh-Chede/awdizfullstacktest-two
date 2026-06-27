import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Dashboard from "./pages/AdminDashboard";
import Employees from "./pages/Employees";
import Projects from "./pages/Projects";
import { getCurrentUser } from "./store/slices/authSlice";


function App() {
  const dispatch = useDispatch()

   useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/employee-dashboard" element={<EmployeeDashboard/>}/>
      <Route path="/employees" element={<Employees></Employees>}></Route>
      <Route path="/projects" element={<Projects/>}></Route>
    </Routes>
  );
}

export default App;
