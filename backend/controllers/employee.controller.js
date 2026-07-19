import EmployeeModel from "../models/employee.model.js";
import UserModel from "../models/user.model.js";

// Create Employee
export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      age,
      department,
      salary,
      skills,
      userId,
    } = req.body;

    if (
      !name ||
      !age ||
      !department ||
      !salary ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const existingEmployee = await EmployeeModel.findOne({ userId });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists for this user.",
      });
    }

    const employee = await EmployeeModel.create({
      name,
      age,
      department,
      salary,
      skills,
      userId,
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

// Get All Employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.find().populate("userId", "-password");

    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Employee
export const updateEmployee = async (req, res) => {
  try {
    const employee = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("userId", "-password");

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

// Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
    const employee =
      await EmployeeModel.findByIdAndDelete(req.params.id);

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

export const getEmployeeUsers = async (req, res) => {
  try {
    const users = await UserModel.find(
      { role: "employee" },
      "-password"
    );

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};