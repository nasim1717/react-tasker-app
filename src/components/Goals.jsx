/* eslint-disable react/prop-types */

import moment from "moment-timezone";
import { useContext } from "react";
import toast from "react-hot-toast";
import { TasksContent } from "../context";

// eslint-disable-next-line react/prop-types
export default function Goals({ task }) {
  const { allTasks, setAllTasks } = useContext(TasksContent);
  const handleFavourite = async (data) => {
    try {
      const getUser = localStorage.getItem("user");
      const accessToken = JSON.parse(getUser).accessToken;
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/edit/${data._id}`, {
        method: "PUT",
        body: JSON.stringify({ ...data, favourite: !data?.favourite }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      });
      const responseParse = await response.json();
      if (responseParse?.status) {
        const findIndex = allTasks.findIndex(
          (taskData) => taskData?._id === responseParse?.data._id
        );
        allTasks[findIndex] = responseParse?.data;
        setAllTasks([...allTasks]);
        if (responseParse?.data?.favourite) {
          toast.success("Task favourite added", { position: "top-right" });
        } else {
          toast.success("Task unfavourite added", { position: "top-right" });
        }
      } else {
        throw "Task favourite not add, please again login";
      }
    } catch (err) {
      toast.success(err, { position: "top-right" });
    }
  };
  return (
    <>
      <div className="bg-gray-800 xl:w-[700px] px-4 py-3 lg:w-[600px] md:w-[450px] w-full border-[1px] border-gray-700 rounded-md mt-6">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold text-gray-100">{task?.title}</h1>
          <div className="space-x-4">
            <span>
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
            <span>
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>
        <p className="mt-3 text-gray-300">{task?.description}</p>
        <p className="mt-3 text-gray-100">{moment(task?.createAt).tz("Asia/Dhaka").fromNow()}</p>
        <div className="mt-3 space-x-3">
          <button
            onClick={() => handleFavourite(task)}
            className={`${
              task?.favourite ? "text-pink-600 hover:text-gray-300" : "hover:text-pink-600"
            }`}
          >
            <i className="fa-regular fa-heart mx-1 "></i> Fav
          </button>
          <button>
            <i className="fa-regular fa-circle-check mx-1"></i> Complete
          </button>
        </div>
      </div>
    </>
  );
}
