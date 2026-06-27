import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import api from "@/config/axiosConfig";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "@/store/slices/employeeSlice";

const Employees = () => {
  const dispatch = useDispatch();

  const { employees, loading } = useSelector(
    (state) => state.employee
  );

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    department: "",
    salary: "",
    skills: "",
    userId: "",
  });

  useEffect(() => {
    dispatch(fetchEmployees());

    fetchUsers();
  }, [dispatch]);

  const fetchUsers = async () => {
  try {
    const res = await api.get("/employee/employees");

    console.log("FULL RESPONSE:", res.data);

    setUsers(res.data.employees); 
  } catch (error) {
    console.log(error);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim()),
    };

    if (editing) {
      dispatch(updateEmployee({ id: editId, data: employeeData }));
    } else {
      dispatch(addEmployee(employeeData));
    }

    setFormData({
      name: "",
      age: "",
      department: "",
      salary: "",
      skills: "",
      userId: "",
    });

    setEditing(false);
    setEditId(null);
  };

  const handleEdit = (emp) => {
    setEditing(true);
    setEditId(emp._id);

    setFormData({
      name: emp.name,
      age: emp.age,
      department: emp.department,
      salary: emp.salary,
      skills: emp.skills.join(", "),
      userId: emp.userId?._id || "",
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Employee Management
        </h1>

        <EmployeeForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editing={editing}
          users={users}
        />

        {loading ? (
          <p className="mt-6">Loading...</p>
        ) : (
          <EmployeeTable
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
};

export default Employees;