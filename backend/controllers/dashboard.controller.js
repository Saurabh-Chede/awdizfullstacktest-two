import EmployeeModel from "../models/employee.model.js";
import ProjectModel from "../models/project.model.js";

export const getDashboard = async (req, res) => {
  try {
    
    const totalEmployees = await EmployeeModel.countDocuments();

    const totalProjects = await ProjectModel.countDocuments();

    const departmentWise = await EmployeeModel.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          department: "$_id",
          count: 1,
        },
      },
    ]);

   
    const highestSalaryEmployee = await EmployeeModel.aggregate([
      {
        $sort: {
          salary: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    const totalBudget = await ProjectModel.aggregate([
      {
        $group: {
          _id: null,
          totalBudget: {
            $sum: "$budget",
          },
        },
      },
    ]);

    const employeeProjectReport = await EmployeeModel.aggregate([
      {
        $lookup: {
          from: "projects",
          localField: "_id",
          foreignField: "employeeId",
          as: "projects",
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          department: 1,
          projects: {
            title: 1,
            budget: 1,
            status: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,

      dashboard: {
        totalEmployees,
        totalProjects,
        totalBudget:
          totalBudget.length > 0
            ? totalBudget[0].totalBudget
            : 0,

        departmentWise,

        highestSalaryEmployee:
          highestSalaryEmployee[0] || null,

        employeeProjectReport,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};