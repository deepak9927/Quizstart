// import { Link } from "react-router-dom";
// import { useState } from "react";

// function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="bg-gray-900 text-white p-4 sticky top-0 shadow-md z-10">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-2xl font-bold tracking-tight">My Portfolio</h1>

//         {/* Hamburger Menu Icon (for small screens) */}
//         <div className="md:hidden">
//           <button
//             onClick={toggleMenu}
//             className="text-gray-300 hover:text-white focus:outline-none"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/s"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               ></path>
//             </svg>
//           </button>
//         </div>

//         {/* Navigation Links (for larger screens) */}
//         <div className="hidden md:flex space-x-6">
//           <Link to="/" className="text-gray-300 hover:text-white transition-colors">
//             Home
//           </Link>
//           <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
//             About
//           </Link>
//           <Link to="/admin" className="text-gray-300 hover:text-white transition-colors">
//             Admin Dashboard
//           </Link>
//           {/* <Link to="/admin/edit/:id" className="text-gray-300 hover:text-white transition-colors">
//             Admin Edit
//           </Link>
//           <Link to="/admin/add" className="text-gray-300 hover:text-white transition-colors">
//             Add Question
//           </Link> */}
//           <Link to="/portfolio" className="text-gray-300 hover:text-white transition-colors">
//             Portfolio
//           </Link>
//           <Link to="/projects" className="text-gray-300 hover:text-white transition-colors">
//             Projects
//           </Link>
//           <Link to="/quiz" className="text-gray-300 hover:text-white transition-colors">
//             Quiz
//           </Link>
          
//           <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
//             Contact
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Menu (for small screens) */}
//       {isMenuOpen && (
//         <div className="md:hidden mt-4">
//           <div className="flex flex-col space-y-4">
//             <Link to="/" className="text-gray-300 hover:text-white transition-colors">
//               Home
//             </Link>
//             <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
//               About
//             </Link>
//             <Link to="/portfolio" className="text-gray-300 hover:text-white transition-colors">
//               Portfolio
//             </Link>
//             <Link to="/projects" className="text-gray-300 hover:text-white transition-colors">
//               Projects
//             </Link>
//             <Link to="/quiz" className="text-gray-300 hover:text-white transition-colors">
//               Quiz
//             </Link>
            
              
            
//             <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
//               Contact
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Header;





import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get current path

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 sticky top-0 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">My Portfolio</h1>

        {/* Hamburger Menu Icon (for mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links (for larger screens) */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" location={location}>Home</NavLink>
          <NavLink to="/about" location={location}>About</NavLink>
          <NavLink to="/portfolio" location={location}>Portfolio</NavLink>
          <NavLink to="/projects" location={location}>Projects</NavLink>
          <NavLink to="/quiz" location={location}>Quiz</NavLink>
          <NavLink to="/contact" location={location}>Contact</NavLink>

          {/* Admin Section */}
          <div className="border-l border-gray-500 pl-4">
            <NavLink to="/admin" location={location}>Admin Dashboard</NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-4">
            <NavLink to="/" location={location} onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" location={location} onClick={closeMenu}>About</NavLink>
            <NavLink to="/portfolio" location={location} onClick={closeMenu}>Portfolio</NavLink>
            <NavLink to="/projects" location={location} onClick={closeMenu}>Projects</NavLink>
            <NavLink to="/quiz" location={location} onClick={closeMenu}>Quiz</NavLink>
            <NavLink to="/contact" location={location} onClick={closeMenu}>Contact</NavLink>

            {/* Admin Section */}
            <div className="border-t border-gray-600 pt-4">
              <NavLink to="/admin" location={location} onClick={closeMenu}>Admin Dashboard</NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Reusable NavLink Component
const NavLink = ({ to, children, location, onClick }) => {
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-gray-300 hover:text-white transition-colors ${
        isActive ? "font-bold underline" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;
