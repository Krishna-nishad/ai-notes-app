import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Notes = () => {
  // =========================
  // NOTES STATES
  // =========================

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [generateTopic, setGenerateTopic] = useState("");
  const [generateLoading, setGenerateLoading] = useState(false);

  // =========================
  // AI STATES
  // =========================

  const [summary, setSummary] = useState("");
  const [summaryNoteId, setSummaryNoteId] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);


  // =========================
  // GET ALL NOTES
  // =========================

  const fetchNotes = async () => {
    try {
      const response = await API.get("/notes");

      setNotes(response.data.notes);

    } catch (error) {
      console.log("FETCH NOTES ERROR:", error);

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // CREATE / UPDATE NOTE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {

      // =========================
      // UPDATE
      // =========================

      if (editingId) {

        await API.put(`/notes/${editingId}`, {
          title,
          content,
        });

        alert("Note updated successfully");

      }

      // =========================
      // CREATE
      // =========================

      else {

        await API.post("/notes", {
          title,
          content,
        });

        alert("Note created successfully");
      }


      // Clear form

      setTitle("");
      setContent("");
      setEditingId(null);


      // Refresh notes

      fetchNotes();

    } catch (error) {

      console.log("SAVE NOTE ERROR:", error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  // ===============================
// AI GENERATE NOTE
// ===============================

const handleGenerateNote = async () => {
  if (!generateTopic.trim()) {
    alert("Please enter a topic");
    return;
  }

  try {
    setGenerateLoading(true);

    const response = await API.post("/ai/generate", {
      topic: generateTopic,
    });

    const result = response.data.result;

    console.log("AI RESULT:", result);

    // Extract title
    const titleMatch = result.match(
      /TITLE:\s*(.*?)(?:\n|CONTENT:)/
    );

    // Extract content
    const contentMatch = result.match(
      /CONTENT:\s*([\s\S]*)/
    );

    const generatedTitle =
      titleMatch?.[1]?.trim() || generateTopic;

    const generatedContent =
      contentMatch?.[1]?.trim() || result;

    // Put AI result into existing form
    setTitle(generatedTitle);
    setContent(generatedContent);

    // Clear topic
    setGenerateTopic("");

    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  } catch (error) {

    console.error(
      "GENERATE NOTE ERROR:",
      error
    );

    alert(
      error.response?.data?.message ||
      "Failed to generate note"
    );

  } finally {
    setGenerateLoading(false);
  }
};


  // =========================
  // EDIT NOTE
  // =========================

  const handleEdit = (note) => {

    setEditingId(note._id);

    setTitle(note.title);

    setContent(note.content);


    // Clear previous AI summary

    setSummary("");

    setSummaryNoteId(null);


    // Scroll to top

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // =========================
  // DELETE NOTE
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await API.delete(`/notes/${id}`);

      alert("Note deleted successfully");


      // If deleted note had summary
      if (summaryNoteId === id) {
        setSummary("");
        setSummaryNoteId(null);
      }


      fetchNotes();

    } catch (error) {

      console.log("DELETE NOTE ERROR:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete note"
      );
    }
  };


  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancelEdit = () => {

    setEditingId(null);

    setTitle("");

    setContent("");
  };


  // =========================
  // AI SUMMARIZE
  // =========================

  const handleSummarize = async (note) => {

    try {

      setAiLoading(true);

      setSummary("");

      setSummaryNoteId(note._id);


      const response = await API.post(
        "/ai/summarize",
        {
          content: note.content,
        }
      );


      setSummary(response.data.summary);

    } catch (error) {

      console.log("AI SUMMARIZE ERROR:", error);

      setSummary("");

      setSummaryNoteId(null);

      alert(
        error.response?.data?.message ||
        "Failed to summarize note"
      );

    } finally {

      setAiLoading(false);
    }
  };


  // =========================
  // LOAD NOTES
  // =========================

  useEffect(() => {

    fetchNotes();

  }, []);


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center">

          <h2 className="text-2xl font-bold">
            Loading Notes...
          </h2>

        </div>
      </>
    );
  }


  // =========================
  // UI
  // =========================

  return (

    <>

      <Navbar />


      <div className="min-h-screen bg-gray-100 p-8">

        <div className="max-w-6xl mx-auto">


          {/* =========================
              PAGE HEADING
          ========================= */}

          <div className="mb-8">

            <h1 className="text-4xl font-bold">
              My Notes 📝
            </h1>

            {/* =========================
    AI GENERATE NOTE
========================= */}

<div className="bg-white shadow-lg rounded-lg p-6 mb-8">

  <h2 className="text-2xl font-bold mb-2">
    ✨ Generate Note with AI
  </h2>

  <p className="text-gray-500 mb-5">
    Enter a topic and AI will create a complete note for you.
  </p>

  <div className="flex flex-col md:flex-row gap-3">

    <input
      type="text"
      placeholder="Example: React useEffect"
      value={generateTopic}
      onChange={(e) =>
        setGenerateTopic(e.target.value)
      }
      className="border flex-1 p-3 rounded outline-none focus:ring-2 focus:ring-purple-500"
    />

    <button
      onClick={handleGenerateNote}
      disabled={generateLoading}
      className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-6 py-3 rounded"
    >
      {generateLoading
        ? "Generating..."
        : "✨ Generate Note"}
    </button>

  </div>

</div>

            <p className="text-gray-500 mt-2">
              Create, manage and summarize your notes with AI.
            </p>

          </div>


          {/* =========================
              CREATE / UPDATE FORM
          ========================= */}

          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">

            <h2 className="text-2xl font-bold mb-5">

              {editingId
                ? "Edit Note"
                : "Create New Note"}

            </h2>


            <form onSubmit={handleSubmit}>


              {/* TITLE */}

              <input
                type="text"
                placeholder="Note title"
                className="border w-full p-3 rounded mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />


              {/* CONTENT */}

              <textarea
                placeholder="Write your note..."
                className="border w-full p-3 rounded mb-4 h-32 outline-none focus:ring-2 focus:ring-blue-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />


              {/* BUTTONS */}

              <div className="flex gap-3">


                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
                >

                  {editingId
                    ? "Update Note"
                    : "Create Note"}

                </button>


                {editingId && (

                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded"
                  >
                    Cancel
                  </button>

                )}

              </div>

            </form>

          </div>


          {/* =========================
              NOTES LIST
          ========================= */}

          <div>


            <div className="flex justify-between items-center mb-5">

              <h2 className="text-2xl font-bold">
                All Notes ({notes.length})
              </h2>

            </div>


            {/* NO NOTES */}

            {notes.length === 0 ? (

              <div className="bg-white shadow p-6 rounded-lg">

                <p className="text-gray-500">
                  No notes found. Create your first note!
                </p>

              </div>

            ) : (


              /* NOTES GRID */

              <div className="grid md:grid-cols-2 gap-6">


                {notes.map((note) => (

                  <div
                    key={note._id}
                    className="bg-white shadow-lg rounded-lg p-6"
                  >


                    {/* NOTE TITLE */}

                    <h3 className="text-xl font-bold mb-2">
                      {note.title}
                    </h3>


                    {/* NOTE CONTENT */}

                    <p className="text-gray-600 mb-5 whitespace-pre-wrap">
                      {note.content}
                    </p>


                    {/* =========================
                        AI SUMMARY
                    ========================= */}

                    {summaryNoteId === note._id && summary && (

                      <div className="mb-5 bg-purple-50 border border-purple-200 rounded-lg p-4">

                        <h4 className="font-bold text-purple-700 mb-2">
                          ✨ AI Summary
                        </h4>

                        <p className="text-gray-700 whitespace-pre-wrap">
                          {summary}
                        </p>

                      </div>

                    )}


                    {/* =========================
                        BUTTONS
                    ========================= */}

                    <div className="flex flex-wrap gap-3">


                      {/* EDIT */}

                      <button
                        onClick={() => handleEdit(note)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>


                      {/* DELETE */}

                      <button
                        onClick={() => handleDelete(note._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>


                      {/* AI SUMMARIZE */}

                      <button
                        onClick={() => handleSummarize(note)}
                        disabled={aiLoading}
                        className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded"
                      >

                        {aiLoading && summaryNoteId === note._id
                          ? "Summarizing..."
                          : "✨ AI Summarize"}

                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </>
  );
};

export default Notes;