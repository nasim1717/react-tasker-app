import { useContext } from "react";
import { AsideContext } from "../context";

export default function Navbar() {
  const { opoenAside, setOpenAside } = useContext(AsideContext);
  return (
    <nav className="flex justify-between md:flex-none bg-gray-800 py-4 border-b-[1px] border-gray-700">
      <button
        onClick={() => setOpenAside(!opoenAside)}
        className="bg-[#0C4A6E] p-2 rounded-md z-50 md:hidden left-4 text-white ml-2"
      >
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className="flex justify-end md:mr-10 mr-4 text-white xl:container mx-auto">
        <h1 className="bg-[#0C4A6E] flex justify-center items-center text-center w-10 h-10 rounded-full cursor-pointer">
          N
        </h1>
      </div>
    </nav>
  );
}
