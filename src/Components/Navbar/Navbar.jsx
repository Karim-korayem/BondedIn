import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";

export default function Navbar() {
  let { token, setToken } = useContext(TokenContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <>

      <div className="navbar bg-base-100 w-[95%] mx-auto shadow-lg">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost text-blue-800 font-bold text-3xl"
          >
            BondedIn
          </Link>
        </div>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="text-blue-800 text-2xl p-1">
                <i className="fa-solid fa-bars"></i>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {token ? (
                <>
                  {" "}
                  <li>
                    <NavLink to="/">
                      <i className="fa-solid fa-house"></i> Home
                    </NavLink>
                  </li>
                   <span className="border-b border-gray-400/50 block text-center"></span>
                  <li>
                    <NavLink to="usersposts">
                      <i className="fa-solid fa-user"></i> My Profile
                    </NavLink>
                  </li>
                   <span className="border-b border-gray-400/50 block text-center"></span>
                </>
              ) : null}

              {token ? (
                <li className=" hover:text-red-500 transition duration-300 ease-in-out">
                  <a onClick={() => logOut()}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                    Log out
                  </a>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/login"><i className="fa-solid fa-arrow-right-to-bracket"></i> Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register"><i className="fa-solid fa-pen"></i> Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
