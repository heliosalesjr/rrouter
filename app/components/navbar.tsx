import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <header className="w-full px-8 text-slate-600 bg-slate-200 shadow-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between py-5 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center">
          <NavLink to="/" className="flex items-center mb-5 md:mb-0">
            <span className="md:text-xl font-black text-slate-700 select-none text-4xl">
              Space<span className="text-sky-500">Odissey</span>
            </span>
          </NavLink>
          <nav className="flex flex-wrap items-center ml-0 md:ml-8 md:border-l md:pl-8">
            <NavLink
              to="/"
              end
              className="mr-5 font-medium text-gray-600 hover:text-gray-900"
            >
              Home
            </NavLink>
            <NavLink
              to="/universe"
              className="mr-5 font-medium text-gray-600 hover:text-gray-900"
            >
              Universe
            </NavLink>
            <NavLink
              to="/about"
              className="mr-5 font-medium text-gray-600 hover:text-gray-900"
            >
              About
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}