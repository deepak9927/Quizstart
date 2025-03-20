// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const AdminDashboard = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/quiz-questions")
//       .then((res) => {
//         if (res.data.success) {
//           setQuestions(res.data.data);
//         } else {
//           setError("Failed to fetch questions.");
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Error fetching questions.");
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this question?")) {
//       return;
//     }
//     try {
//       await axios.delete(`http://localhost:5000/api/quiz-questions/${id}`);
//       setQuestions(questions.filter((q) => q._id !== id));
//       toast.success("Question deleted successfully!");
//     } catch (err) {
//       toast.error("Failed to delete question.");
//     }
//   };

//   if (loading) return <p className="text-center text-xl">Loading...</p>;
//   if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
//       <Link to="/admin/add" className="bg-green-500 text-white px-4 py-2 rounded">Add Question</Link>
//       <table className="w-full mt-6 border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Question</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {questions.map((q) => (
//             <tr key={q._id} className="border">
//               <td className="border p-2">{q.question}</td>
//               <td className="border p-2">
//                 <Link to={`/admin/edit/${q._id}`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</Link>
//                 <button onClick={() => handleDelete(q._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminDashboard;









import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/quiz-questions");
      setQuestions(response.data.data); // Adjust based on API response
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Failed to load questions.");
      setLoading(false);
    }
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/quiz-questions/${id}`);
      toast.success("Question deleted!");
      fetchQuestions(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete question.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <Link to="/admin/add-question" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Add New Question
      </Link>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Question</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Difficulty</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q._id}>
                <td className="border p-2">{q.question}</td>
                <td className="border p-2">{q.category}</td>
                <td className="border p-2 capitalize">{q.difficulty}</td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteQuestion(q._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Delete
                  </button>
                  <Link to={`/admin/edit-question/${q._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
