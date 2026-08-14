import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4">

      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          NotesApp 📝
        </Link>


        {/* Navigation */}

        <div className="flex items-center gap-6">

          {/* Home */}

          <Link
            to="/"
            className="hover:text-blue-400"
          >
            Home
          </Link>


          {token ? (
            <>
              {/* Dashboard */}

              <Link
                to="/dashboard"
                className="hover:text-blue-400"
              >
                Dashboard
              </Link>


              {/* Notes */}

              <Link
                to="/notes"
                className="hover:text-blue-400"
              >
                Notes
              </Link>


              {/* Logout */}

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}

              <Link
                to="/login"
                className="hover:text-blue-400"
              >
                Login
              </Link>


              {/* Signup */}

              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Signup
              </Link>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;