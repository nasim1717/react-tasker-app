import { useContext, useEffect, useState } from "react";
import { AsideContext } from "../context";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { opoenAside, setOpenAside } = useContext(AsideContext);
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = localStorage.getItem("user");
    const getUserParse = JSON.parse(getUser)?.user;
    setUser(getUserParse);
  }, []);

  const handleClick = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between md:flex-none bg-gray-800 py-4 border-b-[1px] border-gray-700">
      <button
        onClick={() => setOpenAside(!opoenAside)}
        className="bg-[#0C4A6E] p-2 rounded-md z-50 md:hidden left-4 text-white ml-2"
      >
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className="flex justify-end md:mr-10 mr-4 text-white xl:container mx-auto relative">
        <h1
          onMouseEnter={() => setUserInfo(true)}
          className="bg-[#0C4A6E] flex justify-center items-center text-center w-10 h-10 rounded-full cursor-pointer"
        >
          {user?.name?.charAt(0)}
        </h1>
        {userInfo && (
          <div
            onMouseLeave={() => setUserInfo(false)}
            className="p-2 absolute top-[38px] z-10 bg-gray-800 rounded flex justify-center items-start flex-col"
          >
            <h1>{user?.name}</h1>
            <h1 onClick={handleClick} className="cursor-pointer">
              Log Out
            </h1>
          </div>
        )}
      </div>
    </nav>
  );
}
