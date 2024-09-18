/* eslint-disable react/prop-types */

import moment from "moment";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { TasksContent } from "../context";
import Modal from "../Pages/Home/Modal";
import usePortal from "../hooks/useProtal";

// eslint-disable-next-line react/prop-types
export default function Goals({ task }) {
  const [isOpen, setIsOpen] = useState(false);
  const { allTasks, setAllTasks, setRevalidate, revealidate } = useContext(TasksContent);
  const portal = usePortal();
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
      toast.error(err, { position: "top-right" });
    }
  };

  const handleDelete = async (data) => {
    try {
      const getUser = localStorage.getItem("user");
      const accessToken = JSON.parse(getUser).accessToken;
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/delete/${data?._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      });
      const responseParse = await response.json();
      if (responseParse.status) {
        const filterTask = allTasks.filter((taskData) => taskData?._id !== data?._id);
        setAllTasks([...filterTask]);
        toast.success("Task delete succussfully!", {
          position: "top-right",
        });
      } else {
        throw "Task not delete, please again login";
      }
    } catch (err) {
      toast.error(err, { position: "top-right" });
    }
  };

  const handleComplete = async (data) => {
    try {
      const getUser = localStorage.getItem("user");
      const accessToken = JSON.parse(getUser).accessToken;
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/edit/${data._id}`, {
        method: "PUT",
        body: JSON.stringify({ ...data, complete: !data?.complete, inprogress: !data.inprogress }),
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
        setRevalidate(!revealidate);
        if (responseParse?.data?.complete) {
          toast.success("Complete Task added", { position: "top-right" });
        } else {
          toast.success("Uncomplete Task added", { position: "top-right" });
        }
      } else {
        throw "Complete Task not add, please again login";
      }
    } catch (err) {
      toast.error(err, { position: "top-right" });
    }
  };

  return (
    <>
      <div className="bg-gray-800 xl:w-[700px] px-4 py-3 lg:w-[600px] md:w-[450px] w-80 border-[1px] border-gray-700 rounded-md mt-6">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold text-gray-100">{task?.title}</h1>
          <div className="space-x-4">
            <span onClick={() => setIsOpen(true)} className="cursor-pointer hover:text-pink-600">
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
            <span onClick={() => handleDelete(task)} className="cursor-pointer hover:text-pink-600">
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>
        <p className="mt-3 text-gray-300 break-words">{task?.description}</p>
        <p className="mt-3 text-gray-100">{moment(task?.createAt).fromNow()}</p>
        <div className="mt-3 space-x-3">
          <button
            onClick={() => handleFavourite(task)}
            className={`${
              task?.favourite ? "text-pink-600 hover:text-gray-300" : "hover:text-pink-600"
            }`}
          >
            <i className="fa-regular fa-heart mx-1 "></i> Fav
          </button>
          <button
            onClick={() => handleComplete(task)}
            className={`${
              task?.complete ? "text-green-500 hover:text-gray-300" : "hover:text-green-500"
            }`}
          >
            <i className="fa-regular fa-circle-check mx-1"></i>{" "}
            {task?.complete ? "Complete" : "In complete"}
          </button>
        </div>
      </div>
      {isOpen && portal(<Modal setIsOpen={setIsOpen} task={task} />)}
    </>
  );
}
