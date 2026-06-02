 import { useState } from "react";
 import { Link } from "react-router-dom";
 import "./Design/Navbar.css";
 
 function NavBar() {
   const [menuOpen, setMenuOpen] = useState(false);
 
   const toggleMenu = () => setMenuOpen((prev) => !prev);
   const closeMenu = () => setMenuOpen(false);
 
   return (
     <nav className="navbar">
       <div className="navbar__logo">
         <span className="navbar__logo-icon">✚</span>
         Doctor Prescription
       </div>
 
       <button
         className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
         onClick={toggleMenu}
         aria-label="Toggle navigation menu"
         aria-expanded={menuOpen}
       >
         <span />
         <span />
         <span />
       </button>
 
       <div className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
         <Link to="/" className="navbar__link" onClick={closeMenu}>
           Home
         </Link>
         <Link to="/Patientform" className="navbar__link" onClick={closeMenu}>
           Patient Form
         </Link>
         <Link to="/showdata" className="navbar__link" onClick={closeMenu}>
           Patient Data
         </Link>
       </div>
 
       {menuOpen && <div className="navbar__overlay" onClick={closeMenu} />}
     </nav>
   );
 }
 
 export default NavBar;
 