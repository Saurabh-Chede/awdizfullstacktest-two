const ProjectForm = ({
  formData,
  handleChange,
  handleSubmit,
  editing,
  employees = [],
}) => {
  console.log("Employees:", employees);
  console.log(Array.isArray(employees));
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-semibold mb-5">
        {editing ? "Update Project" : "Add Project"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded p-2 md:col-span-2"
          rows="4"
          required
        />

        <select
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          className="border rounded p-2"
          required
        >
          <option value="">Select Employee</option>

          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))}
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        {editing ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
