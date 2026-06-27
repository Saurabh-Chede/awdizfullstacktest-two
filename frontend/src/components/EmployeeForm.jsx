const EmployeeForm = ({
  formData,
  handleChange,
  handleSubmit,
  editing,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-semibold mb-5">
        {editing ? "Update Employee" : "Add Employee"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="React, Node, MongoDB"
          value={formData.skills}
          onChange={handleChange}
          className="border rounded p-2 md:col-span-2"
        />

        {/* If your backend requires userId */}
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={formData.userId || ""}
          onChange={handleChange}
          className="border rounded p-2 md:col-span-2"
        />
      </div>

      <button
        type="submit"
        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        {editing ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;