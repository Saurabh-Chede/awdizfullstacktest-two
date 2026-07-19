const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  if (!employees || employees.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">No employees found.</p>
      </div>
    );
  }

  console.log(employees);
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mt-8">
      <table className="w-full border-collapse">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Department</th>
            <th className="p-3 text-left">Salary</th>
            <th className="p-3 text-left">Skills</th>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className="border-b hover:bg-gray-100">
              <td className="p-3">{employee.name}</td>

              <td className="p-3">{employee.age}</td>

              <td className="p-3">{employee.department}</td>

              <td className="p-3">₹{employee.salary}</td>

              <td className="p-3">{employee.skills?.join(", ")}</td>

              <td className="p-3">{employee.userId?.name || "N/A"}</td>

              <td className="p-3 flex justify-center gap-2">
                <button
                  onClick={() => onEdit(employee)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(employee._id)}
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

export default EmployeeTable;
