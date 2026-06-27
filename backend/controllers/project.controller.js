import EmployeeModel from "../models/employee.model.js";
import ProjectModel from "../models/project.model.js";


export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      budget,
      employeeId,
      status,
    } = req.body;

    if (!title || !description || !budget || !employeeId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const employee = await EmployeeModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    const project = await ProjectModel.create({
      title,
      description,
      budget,
      employeeId,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.find().populate({
      path: "employeeId",
      populate: {
        path: "userId",
        select: "-password",
      },
    });

    res.status(200).json({
      success: true,
      totalProjects: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateProject = async (req, res) => {
  try {
    const project = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const project = await ProjectModel.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};