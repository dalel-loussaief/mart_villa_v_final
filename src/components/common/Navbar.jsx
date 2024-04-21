import { useEffect, useState } from "react";
import { FiDelete, FiMoon, FiSun } from "react-icons/fi";
import { BiSearch, BiMenu, BiUser, BiBuildingHouse } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSignInAlt , FaUserCircle  } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { FiLogIn} from 'react-icons/fi';
import {
  closeDropdown,
  closeSidebar,
  openSidebar,
  toggleDarkMode,
  uiStore,
} from "../../features/uiSlice";
import { navLinks } from "../../data/navLinks";
import SingleLink from "./SingleLink";
import {  useLocation} from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const userEmailFromStorage = localStorage.getItem('userEmail');
    if (userEmailFromStorage) {
      setUserEmail(userEmailFromStorage);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
   window.location.href="http://localhost:5174/Login";
    // navigate("/Login"); 
  
  };

  const handleLogout = () => {
    // Logique de déconnexion
    localStorage.removeItem('userEmail');
    setUserEmail('');
    setIsLoggedIn(false);
  };

  const rootDoc = document.querySelector(":root");
  const { darkMode, isSidebarOpen } = useSelector(uiStore);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
  };
  const handleLoginClick = () => {
   
    setIsLoggedIn(true);
  };

  // Fonction pour basculer entre l'affichage et la dissimulation du menu de profil
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
  // Store darkmode value to localStorage;
  useEffect(() => {
    if (darkMode) rootDoc.classList.add("dark");
    else rootDoc.classList.remove("dark");
    localStorage.setItem("Martvilla-theme-mode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleClose = (e) => {
    if (!e.target.classList.contains("link")) {
      dispatch(closeDropdown());
    }
  };

  const handleCloseSidebar = (e) => {
    if (e.target.classList.contains("mobile-modal")) dispatch(closeSidebar());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search");
  };
  // const handleLogout = () => {
  //   localStorage.removeItem('user');
  //   setIsLoggedIn(false); // Mettre à jour l'état de connexion
  //   navigate("/"); // Redirection vers la page de connexion
  // };
  // const handleLogin = () => {
   
  //   navigate("/Login"); 
  // };
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);
  
  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  // function AuthButton({ isLoggedIn, handleLogin, handleLogout, userEmail }) {
  //   if (isLoggedIn) {
  //     return (
  //       <div className="relative">
  //         <FiUser
  //           className="bg-white shadow-md icon-box dark:bg-dark-light hover:shadow-lg hover:bg-transparent cursor-pointer"
  //           onClick={handleLogout}
  //         />
  //         <span className="ml-2">{userEmail}</span>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <FiLogIn
  //         className="bg-white shadow-md icon-box dark:bg-dark-light hover:shadow-lg hover:bg-transparent cursor-pointer"
  //         onClick={handleLogin}
  //       />
  //     );
  //   }
  // }

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleOptionClick = () => {
    const role=2;
    // Suppose role is already defined
    if (role === 2) {
        window.location.href = "http://localhost:5174/Login";
    } else {
        window.location.href = "http://localhost:5173/";
    }
};

  return (
    <div
      className="navbar h-[45px] fixed w-full z-20 top-0 left-0 px-[2%]  md:px-[6%] flex-center-between py-[0.35rem] bg-white/60 border-b backdrop-blur-sm dark:border-dark dark:bg-card-dark/60"
      onMouseOver={handleClose}
    >
      <Link to="/" className="flex-shrink-0 flex-align-center gap-x-1">
        <BiBuildingHouse className="text-3xl text-primary" />
        <h1 className="hidden md:block">MartVilla</h1>
      </Link>

      <div className="flex-align-center gap-x-4">
        {/*-------------------------------------- Desktop Menu------------------------------------- */}
        <ul
          className={`hidden md:flex-align-center ${showSearchBar && "!hidden"
            }`}
        >
          {navLinks.map((link) => (
            <SingleLink {...link} key={link.id} />
          ))}
        </ul>

        {/*---------------------------------------- Mobile Menu------------------------------------- */}
        <div
          className={`lg:hidden mobile-modal fixed w-screen h-screen top-0 left-0 bg-black/50 z-50 opacity-0 pointer-events-none transition-a  ${isSidebarOpen && "open"
            }`}
          onClick={handleCloseSidebar}
        >
          <ul
            className={`mobile-dialog overflow-auto absolute flex flex-col space-y-4 p-3 bg-white dark:bg-card-dark h-screen max-w-[300px] w-full -translate-x-[500px] transition-a ${isSidebarOpen && "open"
              }`}
          >
            <div className="border-b flex-center-between dark:border-slate-800">
              <p className="uppercase">menu</p>
              <div
                className="icon-box md:hidden"
                onClick={() => dispatch(closeSidebar())}
              >
                <FiDelete />
              </div>
            </div>
            {navLinks?.map(({ id, linkText, url, subLinks }) => (
              <ul key={id}>
                <NavLink
                  to={url}
                  end
                  className="w-fit before:!hidden"
                  onClick={() => dispatch(closeSidebar())}
                >
                  {linkText}
                </NavLink>
                {subLinks?.map(({ id, linkText, url }) => (
                  <ul key={id} className="mt-2">
                    <NavLink
                      to={url}
                      end
                      className="relative ml-8 text-sm before:hidden w-fit after:absolute after:w-2 after:h-2 after:rounded-full after:border-2 after:top-1/2 after:-translate-y-1/2 after:-left-4 dark:after:opacity-50"
                      onClick={() => dispatch(closeSidebar())}
                    >
                      {linkText}
                    </NavLink>
                  </ul>
                ))}
              </ul>
            ))}
          </ul>
        </div>

        <div className="space-x-2 flex-align-center">
          {/*----------------------------- search Bar----------------------------------------------------- */}
          <form onSubmit={handleSubmit}>
            <div
              className={`flex-align-center relative h-9 w-9 transition-a  border-slate-300 dark:border-dark rounded-full ${showSearchBar &&
                "!w-[150px] md:!w-[200px] border bg-transparent text-inherit"
                }`}
            >
              <input
                type="search"
                className={`outline-none border-none h-0 w-0 bg-transparent ${showSearchBar && "!w-full !h-full px-4"
                  }`}
                placeholder="search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span
                className={`grid flex-shrink-0 rounded-full w-9 h-9 place-items-center text-white bg-primary sm:cursor-pointer ${showSearchBar &&
                  "bg-transparent hover:bg-slate-100 text-inherit sm:cursor-pointer dark:hover:bg-hover-color-dark"
                  }`}
                onClick={() => setShowSearchBar(!showSearchBar)}
              >
                <BiSearch className="text-muted" />
              </span>
            </div>
          </form>

       

{/*----------------------------- Dark mode toggle-------------------------------------------------- */}
<div className="flex items-center">
      <div
        className="bg-white shadow-md icon-box dark:bg-dark-light hover:shadow-lg hover:bg-transparent"
        onClick={handleDarkMode}
      >
        {darkMode ? <FiSun /> : <FiMoon />}
      </div>

      {/* Utilisation du composant AuthButton pour afficher l'icône de connexion ou de profil */}
      {/* <AuthButton
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userEmail={userEmail}
      /> */}

    </div>
    <div className="relative inline-block">
  {isLoggedIn ? (
    <div>
      <div
        className="bg-white shadow-md icon-box dark:bg-dark-light hover:shadow-lg hover:bg-transparent cursor-pointer p-2"
        onClick={toggleDropdown}
      >
        <FiUser />
      </div>
      {/* <span className="ml-2">{userEmail}</span> */}
      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 w-40 bg-white shadow-md rounded-md">
          <ul>
         
            <li
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  ) : (
    <FiLogIn
      className="bg-white shadow-md icon-box dark:bg-dark-light hover:shadow-lg hover:bg-transparent cursor-pointer p-2"
      onClick={handleLogin}
    />
  )}
</div>

        {/*------------------------------- Mobile Menu Toogle------------------------- */}

        <div
          className="icon-box md:hidden"
          onClick={() => dispatch(openSidebar())}
        >
          <BiMenu />
        </div>

      </div>
    </div>
     </div>
  );
};

export default Navbar;