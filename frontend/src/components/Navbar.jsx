import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        Employee Management
      </h1>

      <div className="flex items-center gap-6">

        {user?.role === "admin" && (
          <>
            <Link to="/dashboard" className="hover:text-gray-200">
              Dashboard
            </Link>

            <Link to="/employees" className="hover:text-gray-200">
              Employees
            </Link>

            <Link to="/projects" className="hover:text-gray-200">
              Projects
            </Link>
          </>
        )}

        {user?.role === "employee" && (
          <>
            <Link
              to="/employee-dashboard"
              className="hover:text-gray-200"
            >
              Dashboard
            </Link>
          </>
        )}

        <span className="font-semibold">
          {user?.name}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;