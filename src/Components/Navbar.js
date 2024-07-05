import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isLoggedIn ,logout, role} = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const rol=localStorage.getItem("role");
  console.log(role);
  return (
    <nav className="bg-blue-600 text-white shadow-md flex justify-between items-center px-8 relative w-full py-6">
      <div className="flex items-center">
        <img src="https://nitw.ac.in/images/nit-logo-jpeg.png" alt="NIT Logo" className="h-16 w-auto" />
      </div>
      <div className="md:hidden cursor-pointer" onClick={handleMenuToggle}>
        <GiHamburgerMenu size={20} color="white" />
      </div>
      <div className="hidden md:flex space-x-4">
        <ul className="flex flex-col md:flex-row items-center md:space-x-6 text-white">
          <li className="nav-item">
            <a className="nav-link text-lg font-semibold text-white hover:text-gray-300 transition duration-300" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-lg font-semibold text-white hover:text-gray-300 transition duration-300" href="/profile">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-lg font-semibold text-white hover:text-gray-300 transition duration-300" href="/comps">Announcements</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-lg font-semibold text-white hover:text-gray-300 transition duration-300" href="/onc">On Campus</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-lg font-semibold text-white hover:text-gray-300 transition duration-300" href="/offc">Off Campus</a>
          </li>
          {rol==="tnp" &&
            <li className="nav-item">
            <a className="nav-link text-lg font-semibold text-white hover:text-gray-300 transition duration-300" href="/compost">Company post</a>
          </li>

          }
          <li>
            {isLoggedIn ? (
              <Link to="/login">

              <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
                Logout
              </button>
               </Link>
            ) : (
              <Link to="/login">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
              Login
              </button>
              </Link>
            )}
          </li>
        </ul>
      </div>
      {isMenuOpen && (
        <div className="absolute top-full z-10 bg-blue-600 left-0 flex flex-col w-full items-center md:hidden">
          <ul className="flex flex-col items-center w-full text-white">
            <li className="nav-item w-full text-center">
              <a className="nav-link text-lg font-semibold text-white bg-blue-600 transition duration-300 w-full py-2" href="/profile">Profile</a>
            </li>
            <li className="nav-item w-full text-center">
              <a className="nav-link text-lg font-semibold text-white bg-blue-600 transition duration-300 w-full py-2" href="/comps">Announcements</a>
            </li>
            <li className="nav-item w-full text-center">
              <a className="nav-link text-lg font-semibold text-white bg-blue-600 transition duration-300 w-full py-2" href="/onc">On Campus</a>
            </li>
            <li className="nav-item w-full text-center">
              <a className="nav-link text-lg font-semibold text-white bg-blue-600 transition duration-300 w-full py-2" href="/offc">Off Campus</a>
            </li>
            <li className="w-full text-center">
            {isLoggedIn ? (
              <Link to="/login">

              <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
                Logout
              </button>
               </Link>
            ) : (
              <Link to="/login">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
              Login
              </button>
              </Link>
            )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
