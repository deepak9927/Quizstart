// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const AddQuestion = () => {
//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [correctIndex, setCorrectIndex] = useState(0);
//   const [category, setCategory] = useState("");
//   const [difficulty, setDifficulty] = useState("medium");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate that no option is empty
//     if (options.some((opt) => opt.trim() === "")) {
//       toast.error("All options must be filled.");
//       return;
//     }

//     if (!category.trim()) {
//       toast.error("Category is required.");
//       return;
//     }

//     const newQuestion = {
//       question,
//       options: options.map((opt, idx) => ({
//         text: opt,
//         isCorrect: idx === correctIndex,
//       })),
//       category,
//       difficulty,
//     };

//     console.log("Sending Data:", newQuestion); // Debugging

//     try {
//       const response = await axios.post("http://localhost:5000/api/quiz-questions", newQuestion);
      
//       console.log("Response:", response.data); // Debugging
//       toast.success("Question added successfully!");

//       // Reset form fields
//       setQuestion("");
//       setOptions(["", "", "", ""]);
//       setCorrectIndex(0);
//       setCategory("");
//       setDifficulty("medium");

//       // Redirect after adding question
//       navigate("/quiz");
//     } catch (error) {
//       console.error("Error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to add question.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6">Add New Question</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <label className="block">
//           Question:
//           <input
//             type="text"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </label>

//         {options.map((opt, idx) => (
//           <div key={idx} className="flex items-center space-x-2">
//             <input
//               type="text"
//               value={opt}
//               onChange={(e) => {
//                 const newOptions = [...options];
//                 newOptions[idx] = e.target.value;
//                 setOptions(newOptions);
//               }}
//               className="w-full border p-2 rounded"
//               required
//             />
//             <input
//               type="radio"
//               name="correctOption"
//               checked={correctIndex === idx}
//               onChange={() => setCorrectIndex(idx)}
//             />
//             <span>Correct Answer</span>
//           </div>
//         ))}

//         <label className="block">
//           Category:
//           <input
//             type="text"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </label>

//         <label className="block">
//           Difficulty:
//           <select
//             value={difficulty}
//             onChange={(e) => setDifficulty(e.target.value)}
//             className="w-full border p-2 rounded"
//           >
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>
//         </label>

//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
//           Add Question
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddQuestion;



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [categories, setCategories] = useState([]); // Store available categories

  const navigate = useNavigate();

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories"); // Ensure this route exists in your backend
        setCategories(response.data); // Expecting an array of category names
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (options.some((opt) => opt.trim() === "")) {
      toast.error("All options must be filled.");
      return;
    }
    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    const newQuestion = {
      question,
      options: options.map((opt, idx) => ({
        text: opt,
        isCorrect: idx === correctIndex,
      })),
      category,
      difficulty,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/quiz-questions", newQuestion);
      toast.success("Question added successfully!");

      // Reset form
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectIndex(0);
      setCategory("");
      setDifficulty("medium");

      navigate("/quiz");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to add question.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Add New Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        {options.map((opt, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <input
              type="text"
              value={opt}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[idx] = e.target.value;
                setOptions(newOptions);
              }}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="radio"
              name="correctOption"
              checked={correctIndex === idx}
              onChange={() => setCorrectIndex(idx)}
            />
            <span>Correct Answer</span>
          </div>
        ))}

        <label className="block">
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select a Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Difficulty:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;

