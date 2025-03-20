import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Projects from "./components/Project";
import Quiz from "./components/Quiz";
import Contact from "./components/Contact";
import { Hero } from "./components/Hero";
import { Toaster } from "react-hot-toast";
import { Portfolio } from "./components/Portfolio";
import { ThemeProvider } from "./context/ThemeContext";

// ✅ Import new admin pages
import AdminDashboard from "./components/AdminDashboard";
import AddQuestion from "./components/AddQuestion";
import EditQuestion from "./components/EditQuestion";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />

            {/* ✅ Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add" element={<AddQuestion />} />
            <Route path="/admin/edit/:id" element={<EditQuestion />} />
            <Route path="/admin/add-question" element={<AddQuestion />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
