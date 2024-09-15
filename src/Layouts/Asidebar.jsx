import { Link } from "react-router-dom";
import Logo from "../assets/goals-logo.png";
import { useContext } from "react";
import { AsideContext } from "../context";

export default function Asidebar() {
  const { opoenAside } = useContext(AsideContext);
  return (
    <>
      <aside
        id="drawer"
        className={`h-[90.5vh] md:w-2/6 w-[300px] bg-gray-800 border-r-[1px] border-gray-700 transform  transition-transform md:translate-x-0 absolute md:relative z-40 ${
          opoenAside && "-translate-x-full"
        }`}
      >
        <nav className="ml-6 pr-3 pt-6">
          <ul className="space-y-3">
            <li className="flex gap-4 items-center py-6 text-3xl italic ml-1">
              <img src={Logo} alt="goal" width="60px" />
              <span>Goals</span>
            </li>
            <li className="py-5 text-[27px] hover:text-pink-600 hover:bg-gray-700/50 rounded-md cursor-pointer">
              <Link to="/">
                {" "}
                <span>
                  <i className="fa-solid fa-house mr-1 pl-3"></i>
                </span>{" "}
                Home
              </Link>
            </li>
            <li className="py-5 text-[27px] hover:text-pink-600 hover:bg-gray-700/50 rounded-md cursor-pointer">
              <Link to="/favourite">
                {" "}
                <span>
                  <i className="fa-solid fa-heart mr-1 pl-3"></i>
                </span>{" "}
                Favourite
              </Link>
            </li>
            <li className="py-5 text-[27px] hover:text-pink-600 hover:bg-gray-700/50 rounded-md cursor-pointer">
              <Link to="/inprogress">
                <span>
                  <i className="fa-brands fa-stack-exchange mr-1 pl-3"></i>
                </span>{" "}
                In Progress
              </Link>
            </li>
            <li className="py-5 text-[27px] hover:text-pink-600 hover:bg-gray-700/50 rounded-md cursor-pointer">
              <Link to="/complete">
                <span>
                  <i className="fa-regular fa-circle-check mr-1 pl-3"></i>
                </span>{" "}
                Completed
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
