import EmployeeModel from "../models/employee.model.js";

export const createEmployee = async (req, res) => {
  try {
    const { name, age, department, salary, skills } = req.body;

    if (!name || !age || !department || !salary) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const employee = await EmployeeModel.create({
      name,
      age,
      department,
      salary,
      skills,
      userId: req.userId,
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully.",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getEmployees = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
        { skills: { $regex: search, $options: "i" } },
      ],
    };

    const employees = await EmployeeModel.find(query)
      .populate("userId", "-password")
      .skip((page - 1) * limit)
      .limit(limit);

    const totalEmployees = await EmployeeModel.countDocuments(query);

    res.status(200).json({
      success: true,
      totalEmployees,
      currentPage: page,
      totalPages: Math.ceil(totalEmployees / limit),
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully.",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteEmployee = async (req, res) => {
  try {
    const employee = await EmployeeModel.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};