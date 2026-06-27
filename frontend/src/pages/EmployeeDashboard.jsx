import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { fetchProjects } from "@/store/slices/projectSlice";

const EmployeeDashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { projects, loading } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name}
        </h1>

        <p className="text-gray-600 mt-2">
          Role: {user?.role}
        </p>

        <div className="mt-8 bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-4">
            My Projects
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : projects.length === 0 ? (
            <p>No projects assigned.</p>
          ) : (
            <table className="w-full border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Budget</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td className="border p-2">
                      {project.title}
                    </td>

                    <td className="border p-2">
                      {project.description}
                    </td>

                    <td className="border p-2">
                      ₹{project.budget}
                    </td>

                    <td className="border p-2">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          project.status === "completed"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;