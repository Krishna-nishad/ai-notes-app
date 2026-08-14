import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar />

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="min-h-[calc(100vh-64px)] bg-gray-100 flex items-center">

        <div className="max-w-6xl mx-auto px-6 py-16 w-full">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT */}

            <div>

              <p className="text-blue-600 font-semibold text-lg mb-4">
                📝 Simple & Powerful Notes App
              </p>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Organize Your
                <span className="text-blue-600"> Ideas </span>
                Easily.
              </h1>

              <p className="text-gray-600 text-lg mt-6 leading-relaxed">
                Create, manage, edit and delete your personal notes
                from anywhere. Everything is secured with JWT
                authentication.
              </p>


              {/* BUTTONS */}

              <div className="flex flex-wrap gap-4 mt-8">

                {token ? (

                  <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg font-semibold transition"
                  >
                    Go to Dashboard →
                  </button>

                ) : (

                  <>
                    <button
                      onClick={() => navigate("/signup")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg font-semibold transition"
                    >
                      Get Started →
                    </button>

                    <button
                      onClick={() => navigate("/login")}
                      className="border border-gray-400 hover:bg-gray-200 px-7 py-3 rounded-lg font-semibold transition"
                    >
                      Login
                    </button>
                  </>

                )}

              </div>

            </div>


            {/* RIGHT - NOTE CARD */}

            <div className="flex justify-center">

              <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md transform rotate-2 hover:rotate-0 transition duration-300">

                {/* Card Header */}

                <div className="flex justify-between items-center mb-6">

                  <div>
                    <h2 className="text-2xl font-bold">
                      My Notes
                    </h2>

                    <p className="text-gray-500 text-sm">
                      Keep your ideas organized
                    </p>
                  </div>

                  <div className="bg-blue-100 text-blue-600 p-3 rounded-lg text-xl">
                    📝
                  </div>

                </div>


                {/* Note 1 */}

                <div className="border rounded-xl p-4 mb-4">

                  <h3 className="font-bold text-lg">
                    React Learning
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Learn useState, useEffect and React Router...
                  </p>

                </div>


                {/* Note 2 */}

                <div className="border rounded-xl p-4 mb-4">

                  <h3 className="font-bold text-lg">
                    MongoDB
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Learn MongoDB, Mongoose and database queries...
                  </p>

                </div>


                {/* Note 3 */}

                <div className="border rounded-xl p-4">

                  <h3 className="font-bold text-lg">
                    Full Stack Project
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Building a MERN stack notes application...
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FEATURES
      ========================= */}

      <section className="bg-white py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">
            Everything You Need
          </h2>

          <p className="text-gray-500 text-center mt-3">
            Simple features to manage your notes efficiently.
          </p>


          <div className="grid md:grid-cols-3 gap-8 mt-12">

            {/* Feature 1 */}

            <div className="shadow-lg rounded-xl p-7">

              <div className="text-4xl mb-4">
                ✍️
              </div>

              <h3 className="text-xl font-bold">
                Create Notes
              </h3>

              <p className="text-gray-500 mt-3">
                Quickly create notes and save your important
                ideas in one place.
              </p>

            </div>


            {/* Feature 2 */}

            <div className="shadow-lg rounded-xl p-7">

              <div className="text-4xl mb-4">
                ✏️
              </div>

              <h3 className="text-xl font-bold">
                Edit & Update
              </h3>

              <p className="text-gray-500 mt-3">
                Easily update your notes whenever you want.
              </p>

            </div>


            {/* Feature 3 */}

            <div className="shadow-lg rounded-xl p-7">

              <div className="text-4xl mb-4">
                🔐
              </div>

              <h3 className="text-xl font-bold">
                Secure
              </h3>

              <p className="text-gray-500 mt-3">
                JWT authentication keeps your personal notes
                protected.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================= */}

      {!token && (

        <section className="bg-blue-600 text-white py-20">

          <div className="max-w-4xl mx-auto text-center px-6">

            <h2 className="text-4xl font-bold">
              Start Organizing Your Notes Today
            </h2>

            <p className="mt-4 text-blue-100 text-lg">
              Create your free account and start managing
              your notes.
            </p>

            <button
              onClick={() => navigate("/signup")}
              className="mt-8 bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold"
            >
              Create Free Account
            </button>

          </div>

        </section>

      )}


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="bg-gray-900 text-gray-400 py-8">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <p>
            © {new Date().getFullYear()} NotesApp. All rights reserved.
          </p>

        </div>

      </footer>

    </>
  );
}

export default Home;