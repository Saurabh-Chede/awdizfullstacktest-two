import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ProjectForm from "../components/ProjectForm";
import api from "@/config/axiosConfig";

import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
} from "@/store/slices/projectSlice";

const Projects = () => {
  const dispatch = useDispatch();

  const { projects, loading } = useSelector((state) => state.project);

  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    employeeId: "",
    status: "pending",
  });

  useEffect(() => {
    dispatch(fetchProjects());
    fetchEmployees();
  }, [dispatch]);

  const fetchEmployees = async () => {
  const res = await api.get("/employee/employees");
  setEmployees(res.data.employees);
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      dispatch(
        updateProject({
          id: editId,
          data: formData,
        }),
      );
    } else {
      dispatch(addProject(formData));
    }

    setFormData({
      title: "",
      description: "",
      budget: "",
      employeeId: "",
      status: "pending",
    });

    setEditing(false);
    setEditId(null);
  };

  const handleEdit = (project) => {
    setEditing(true);
    setEditId(project._id);

    setFormData({
      title: project.title,
      description: project.description,
      budget: project.budget,
      employeeId: project.employeeId?._id || "",
      status: project.status,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this project?")) {
      dispatch(deleteProject(id));
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Project Management</h1>

        <ProjectForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editing={editing}
          employees={employees}
        />

        <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Budget</th>
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-5">
                    Loading...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-5">
                    No Projects Found
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{project.title}</td>

                    <td className="p-3">{project.description}</td>

                    <td className="p-3">₹{project.budget}</td>

                    <td className="p-3">{project.employeeId?.name || "N/A"}</td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded text-white ${
                          project.status === "completed"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>

                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(project._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Projects;
