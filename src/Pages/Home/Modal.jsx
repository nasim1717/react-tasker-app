import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { TasksContent } from "../../context";

// eslint-disable-next-line react/prop-types
export default function Modal({ setIsOpen }) {
  const [loading, setLoading] = useState(false);
  const { allTasks, setAllTasks } = useContext(TasksContent);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const getUser = localStorage.getItem("user");
      const accessToken = JSON.parse(getUser).accessToken;
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/addtasks`, {
        method: "POST",
        body: JSON.stringify({ title: data?.title, description: data?.description }),
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
        setAllTasks([...allTasks, responseParse?.data]);
        setIsOpen(false);
        setLoading(false);
      } else {
        throw responseParse.message;
      }
    } catch {
      toast.error("Task not added, please again login", {
        position: "top-right",
      });
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
              type="submit"
              className="flex justify-center items-center py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md"
            >
              <p> Add Goal</p>
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
