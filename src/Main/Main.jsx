import { Outlet, useLocation } from "react-router-dom";
import Asidebar from "../Layouts/Asidebar";
import Modal from "../Pages/Home/Modal";
import { useState } from "react";
import usePortal from "../hooks/useProtal";
import Navbar from "../Layouts/Navabr";
import { AsideContext } from "../context";

export default function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const portal = usePortal("Add-goal");
  const location = useLocation();
  const [opoenAside, setOpenAside] = useState(false);
  return (
    <>
      <AsideContext.Provider value={{ opoenAside, setOpenAside }}>
        <Navbar />
        <main className="text-white font-sans h-[calc(100%-4rem)] flex relative">
          <Asidebar />

          <section className="font-sans xl:mr-6 md:w-4/6 w-full">
            <div
              className={`flex justify-end mt-3 xl:mr-5 ${location?.pathname !== "/" && "mb-6"}`}
            >
              {location?.pathname === "/" && (
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-[#0C4A6E] hover:bg-[#0C4A6E]/75 w-[130px] py-2 px-2 rounded-md text-xl mr-2"
                >
                  <i className="fa-solid fa-plus"></i> New Goal
                </button>
              )}
            </div>
            <Outlet />
          </section>
        </main>
        {isOpen && portal(<Modal setIsOpen={setIsOpen} />)}
      </AsideContext.Provider>
    </>
  );
}
