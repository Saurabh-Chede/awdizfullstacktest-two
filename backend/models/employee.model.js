import mongoose,{Schema} from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EmployeeModel = mongoose.model("Employee", employeeSchema);

export default EmployeeModel;