// import { useState, useEffect } from "react";

// function Quiz() {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showScore, setShowScore] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch questions on mount
//   useEffect(() => {
//     fetch("http://localhost:5000/api/quiz-questions")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched data:", data); // Debugging
//         if (data.success && data.count > 0) {
//           setQuestions(data.data); // Ensure data.data is an array
//         } else {
//           setError("No quiz questions available.");
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         setError("Failed to load quiz questions.");
//         setLoading(false);
//       });
//   }, []);

//   // Handle answer selection
//   const handleAnswer = (selectedOption) => {
//     const correctAnswer = questions[currentQuestion]?.options.find(
//       (option) => option.isCorrect
//     )?.text;

//     if (selectedOption === correctAnswer) {
//       setScore(score + 1);
//     }

//     const nextQuestion = currentQuestion + 1;
//     if (nextQuestion < questions.length) {
//       setCurrentQuestion(nextQuestion);
//     } else {
//       setShowScore(true);
//     }
//   };

//   // Reset quiz
//   const resetQuiz = () => {
//     setCurrentQuestion(0);
//     setScore(0);
//     setShowScore(false);
//   };

//   // Show loading or error messages
//   if (loading) {
//     return (
//       <section className="py-16 bg-gray-50">
//         <div className="container text-center">
//           <p className="text-2xl text-gray-700">Loading questions...</p>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="py-16 bg-gray-50">
//         <div className="container text-center">
//           <p className="text-2xl text-red-600">{error}</p>
//         </div>
//       </section>
//     );
//   }

//   if (questions.length === 0) {
//     return (
//       <section className="py-16 bg-gray-50">
//         <div className="container text-center">
//           <p className="text-2xl text-gray-700">No quiz questions found.</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container text-center">
//         <h2 className="text-4xl font-bold mb-6">Tech Quiz</h2>
//         <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
//           {showScore ? (
//             <div>
//               <p className="text-2xl mb-4 text-gray-700">
//                 You scored {score} out of {questions.length}!
//               </p>
//               <button
//                 onClick={resetQuiz}
//                 className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition-colors"
//               >
//                 Retry Quiz
//               </button>
//             </div>
//           ) : (
//             <div>
//               {/* Progress Bar */}
//               <div className="mb-6">
//                 <p className="text-gray-600">
//                   Question {currentQuestion + 1} of {questions.length}
//                 </p>
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                   <div
//                     className="bg-indigo-500 h-2.5 rounded-full"
//                     style={{
//                       width: `${((currentQuestion + 1) / questions.length) * 100}%`,
//                     }}
//                   ></div>
//                 </div>
//               </div>

//               {/* Question */}
//               <h3 className="text-xl font-semibold mb-4 text-gray-800">
//                 {questions[currentQuestion]?.question}
//               </h3>

//               {/* Options */}
//               <div className="grid grid-cols-1 gap-4">
//                 {questions[currentQuestion]?.options?.map((option, index) => (
//                   <button
//                     key={option._id}
//                     onClick={() => handleAnswer(option.text)}
//                     className="bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition-colors"
//                   >
//                     {option.text}
//                   </button>
//                 ))}
//               </div>

//               {/* Navigation Buttons */}
//               <div className="flex justify-between mt-6">
//                 <button
//                   onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
//                   disabled={currentQuestion === 0}
//                   className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => setCurrentQuestion((prev) => prev + 1)}
//                   disabled={currentQuestion === questions.length - 1}
//                   className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Quiz;










import { useState, useEffect } from "react";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/quiz-questions")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.count > 0) {
          setQuestions(data.data.map((q) => ({
            ...q,
            options: shuffleArray(q.options), // Shuffle options for fairness
          })));
        } else {
          setError("No quiz questions available.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load quiz questions.");
        setLoading(false);
      });
  }, []);

  const handleAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return; // Prevent skipping without selecting

    const correctAnswer = questions[currentQuestion]?.options.find((option) => option.isCorrect)?.text;
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }

    setSelectedAnswer(null);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const submitQuiz = () => {
    if (selectedAnswer !== null) {
      handleNextQuestion();
    }
    setShowScore(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  if (loading) return <p className="text-center text-2xl">Loading questions...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (questions.length === 0) return <p className="text-center text-gray-700">No questions available.</p>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container text-center">
        <h2 className="text-4xl font-bold mb-6">Tech Quiz</h2>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
          {showScore ? (
            <div>
              <p className="text-2xl mb-4 text-gray-700">
                🎉 You scored {score} out of {questions.length} ({Math.round((score / questions.length) * 100)}%)
              </p>
              <p className="text-lg mb-4 text-gray-600">
                {Math.round((score / questions.length) * 100) >= 70 ? "Great job! 🎯" : "Keep practicing! 💪"}
              </p>
              <button onClick={resetQuiz} className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600">
                Retry Quiz
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <p className="text-gray-600">Category: {questions[currentQuestion].category}</p>
                <p className="text-gray-600">Difficulty: {questions[currentQuestion].difficulty}</p>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {questions[currentQuestion]?.question}
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion]?.options.map((option) => (
                  <button
                    key={option._id}
                    onClick={() => handleAnswer(option.text)}
                    className={`p-3 rounded-lg transition-colors ${
                      selectedAnswer === option.text ? "bg-indigo-700 text-white" : "bg-indigo-500 text-white hover:bg-indigo-600"
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                {currentQuestion > 0 && (
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600"
                  >
                    Previous
                  </button>
                )}

                {currentQuestion < questions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 disabled:bg-indigo-300"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={submitQuiz}
                    disabled={selectedAnswer === null}
                    className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 disabled:bg-green-300"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Function to shuffle array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default Quiz;
