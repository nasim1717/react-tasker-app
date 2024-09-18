/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { TasksContent } from "../../context";

// eslint-disable-next-line react/prop-types
export default function Modal({ setIsOpen, task }) {
  const [loading, setLoading] = useState(false);
  const { allTasks, setAllTasks } = useContext(TasksContent);
  const [taskData, setTaskData] = useState(
    task?._id ? { ...task } : { title: "", description: "" }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("taskData-->", taskData);
    const url = task?._id
      ? `${import.meta.env.VITE_BASE_URL}/edit/${task?._id}`
      : `${import.meta.env.VITE_BASE_URL}/addtasks`;
    try {
      setLoading(true);
      const getUser = localStorage.getItem("user");
      const accessToken = JSON.parse(getUser).accessToken;
      const response = await fetch(url, {
        method: task?._id ? "PUT" : "POST",
        body: JSON.stringify(
          task?._id ? { title: taskData?.title, description: taskData?.description } : taskData
        ),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      });
      const responseParse = await response.json();
      if (responseParse.status) {
        toast.success(responseParse.message, {
          position: "top-right",
        });
        if (task?._id) {
          const findIndex = allTasks.findIndex((findTask) => findTask?._id === task?._id);
          allTasks[findIndex] = responseParse?.data;
          setAllTasks([...allTasks]);
        } else {
          setAllTasks([...allTasks, responseParse?.data]);
        }

        setIsOpen(false);
        setLoading(false);
      } else {
        throw responseParse.message;
      }
    } catch {
      toast.error(
        task?._id ? "Task not updated, please again login" : "Task not added, please again login",
        {
          position: "top-right",
        }
      );
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm z-50">
      <div className="bg-gray-800 md:w-[500px] w-[400px] p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl mb-4 text-white">Add New Goal</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-white">
              Title
            </label>
            <input
              {...register("title", { required: "Title field is required" })}
              onChange={(e) => {
                setTaskData({ ...taskData, title: e.target.value });
              }}
              value={taskData?.title}
              name="title"
              id="title"
              type="text"
              className="w-full p-2 rounded-md bg-gray-700 text-white"
              placeholder="Goal Title"
            />
            {errors?.title && <p className="text-red-500 text-sm mt-1">{errors?.title?.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-white">
              Description
            </label>
            <textarea
              {...register("description", { required: "Description field is required" })}
              onChange={(e) => {
                setTaskData({ ...taskData, description: e.target.value });
              }}
              value={taskData?.description}
              id="description"
              name="description"
              className="w-full p-2 rounded-md bg-gray-700 text-white"
              rows="4"
              placeholder="Goal Description"
            ></textarea>
            {errors?.description && (
              <p className="text-red-500 text-sm mt-1">{errors?.description?.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="py-2 px-4 bg-gray-600 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="flex justify-center items-center py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md"
            >
              <p> {task?._id ? "Update Task" : "Add Task"}</p>
              {loading && (
                <ThreeDots color="white" width={40} height={15} radius={15} visible={true} />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
