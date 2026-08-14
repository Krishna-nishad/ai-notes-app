import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // =========================
  // FETCH USER PROFILE
  // =========================
  const fetchProfile = async () => {
    try {
      const response = await API.get("/auth/profile");

      setUser(response.data.user);

    } catch (error) {
      console.log("PROFILE ERROR:", error);

      // Token invalid / expired
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  // =========================
  // FETCH NOTES
  // =========================
  const fetchNotes = async () => {
    try {
      const response = await API.get("/notes");

      setNotes(response.data.notes);

    } catch (error) {
      console.log("NOTES ERROR:", error);
    }
  };

  // =========================
  // LOAD DASHBOARD
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const loadDashboard = async () => {
      await fetchProfile();
      await fetchNotes();

      setLoading(false);
    };

    loadDashboard();
  }, []);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  // =========================
  // DASHBOARD UI
  // =========================
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <div className="max-w-6xl mx-auto">

          {/* =========================
              HEADER
          ========================= */}

          <div className="flex justify-between items-center mb-8">

            <div>
              <h1 className="text-4xl font-bold">
                Dashboard
              </h1>

              {user && (
                <p className="text-gray-600 mt-2">
                  Welcome, {user.name} 👋
                </p>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
            >
              Logout
            </button>

          </div>


          {/* =========================
              STATS
          ========================= */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            {/* Total Notes */}

            <div className="bg-white shadow-lg p-6 rounded-lg">

              <h2 className="text-gray-500">
                Total Notes
              </h2>

              <p className="text-4xl font-bold mt-2">
                {notes.length}
              </p>

            </div>


            {/* User */}

            <div className="bg-white shadow-lg p-6 rounded-lg">

              <h2 className="text-gray-500">
                User
              </h2>

              <p className="text-xl font-bold mt-2">
                {user?.name || "User"}
              </p>

            </div>


            {/* Email */}

            <div className="bg-white shadow-lg p-6 rounded-lg">

              <h2 className="text-gray-500">
                Email
              </h2>

              <p className="text-xl font-bold mt-2 break-all">
                {user?.email || "No email"}
              </p>

            </div>

          </div>


          {/* =========================
              NOTES
          ========================= */}

          <div className="bg-white shadow-lg p-6 rounded-lg">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                My Notes
              </h2>

              <button
                onClick={() => navigate("/notes")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
              >
                View All Notes
              </button>

            </div>


            {notes.length === 0 ? (

              <div className="border rounded p-6 text-center">

                <p className="text-gray-500 mb-4">
                  You don't have any notes yet.
                </p>

                <button
                  onClick={() => navigate("/notes")}
                  className="bg-blue-600 text-white px-5 py-2 rounded"
                >
                  Create Your First Note
                </button>

              </div>

            ) : (

              <div className="space-y-4">

                {notes.slice(0, 5).map((note) => (

                  <div
                    key={note._id}
                    className="border p-4 rounded-lg hover:shadow-md transition"
                  >

                    <h3 className="text-xl font-bold">
                      {note.title}
                    </h3>

                    <p className="text-gray-600 mt-1">
                      {note.content}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;