// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const EditQuestion = () => {
//   const { id } = useParams();
//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [correctIndex, setCorrectIndex] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/quiz-questions/${id}`)
//       .then((res) => {
//         if (res.data.success) {
//           setQuestion(res.data.data.question);
//           const formattedOptions = res.data.data.options.map((opt, idx) => ({
//             text: opt.text,
//             isCorrect: opt.isCorrect,
//           }));
//           setOptions(formattedOptions.map(opt => opt.text));
//           setCorrectIndex(formattedOptions.findIndex(opt => opt.isCorrect));
//         }
//       })
//       .catch(() => toast.error("Failed to fetch question data."));
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formattedOptions = options.map((text, index) => ({
//       text,
//       isCorrect: index === correctIndex,
//     }));
//     try {
//       await axios.put(`http://localhost:5000/api/quiz-questions/${id}`, {
//         question,
//         options: formattedOptions,
//       });
//       toast.success("Question updated successfully!");
//       navigate("/admin");
//     } catch (err) {
//       toast.error("Failed to update question.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6">Edit Question</h2>
//       <form onSubmit={handleSubmit}>
//         <label className="block mb-4">
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
//           <label key={idx} className="block mb-2">
//             Option {idx + 1}:
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
//             /> Correct Answer
//           </label>
//         ))}

//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           Update Question
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditQuestion;







import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("medium");

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/quiz-questions/${id}`);
      const data = response.data.data;
      setQuestion(data.question);
      setOptions(data.options.map((opt) => opt.text));
      setCorrectIndex(data.options.findIndex((opt) => opt.isCorrect));
      setCategory(data.category);
      setDifficulty(data.difficulty);
    } catch (error) {
      console.error("Error fetching question:", error);
      toast.error("Failed to load question.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedQuestion = {
      question,
      options: options.map((opt, idx) => ({
        text: opt,
        isCorrect: idx === correctIndex,
      })),
      category,
      difficulty,
    };

    try {
      await axios.put(`http://localhost:5000/api/quiz-questions/${id}`, updatedQuestion);
      toast.success("Question updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating question:", error);
      toast.error("Failed to update question.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Edit Question</h2>
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
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
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
          Update Question
        </button>
      </form>
    </div>
  );
};

export default EditQuestion;
