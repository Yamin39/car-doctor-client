import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { AuthContext } from "../../../providers/AuthProvider";

const Navbar = () => {
  const { user, loading, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/CartDetails">Cart Details</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/signUp">Sign Up</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navItems}
          </ul>
        </div>
        <Link to="/">
          <img className="max-w-[4rem] lg:max-w-28" src={logo} alt="Car doctor logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user && (
          <div>
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src={user.photoURL || "https://cdn-icons-png.flaticon.com/128/1144/1144760.png"} />
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  {user.displayName && (
                    <li>
                      <a>{user.displayName}</a>
                    </li>
                  )}
                  {user.email && (
                    <li>
                      <a>{user.email}</a>
                    </li>
                  )}
                  <li>
                    <a className="text-error" onClick={handleLogOut}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        <a className="btn btn-outline btn-error ml-2">Appointment</a>
      </div>
    </div>
  );
};

export default Navbar;
