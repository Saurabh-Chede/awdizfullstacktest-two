const ProjectTable = ({
  projects,
  onEdit,
  onDelete,
}) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">
          No Projects Found
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
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
          {projects.map((project) => (
            <tr
              key={project._id}
              className="border-b hover:bg-gray-100"
            >
              <td className="p-3">
                {project.title}
              </td>

              <td className="p-3">
                {project.description}
              </td>

              <td className="p-3">
                ₹{project.budget}
              </td>

              <td className="p-3">
                {project.employeeId?.name || "N/A"}
              </td>

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
                  onClick={() => onEdit(project)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(project._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;