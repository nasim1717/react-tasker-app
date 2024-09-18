import { useContext, useEffect, useState } from "react";
import Goals from "../../components/Goals";
import { TasksContent } from "../../context";
import { useNavigate } from "react-router-dom";

export default function Favourite() {
  const { allTasks, setAllTasks } = useContext(TasksContent);
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    async function taskFetch() {
      setLoading(true);
      try {
        const getUser = localStorage.getItem("user");
        const accessToken = JSON.parse(getUser).accessToken;
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/favourite`, {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        });
        const responseParse = await response.json();
        if (responseParse.status) {
          if (!ignore) {
            setAllTasks(responseParse.data);
            setLoading(false);
            setError("");
          }
        } else {
          throw "Somthing wrong";
        }
      } catch {
        setLoading(false);
        setError("Somthing is wrong!");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
    taskFetch();
    return () => (ignore = true);
  }, []);

  let content = null;
  if (loading) {
    content = <p className="mt-9">Loading...</p>;
  } else if (!loading && isError) {
    content = <p className="mt-9">{isError}</p>;
  } else if (!loading && !isError && allTasks.length === 0) {
    content = <p className="mt-9">You don&apos;t have any task</p>;
  } else if (!loading && !isError && allTasks.length > 0) {
    content = allTasks.map((task) => <Goals key={task._id} task={task} />);
  }

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="overflow-scroll h-[630px] scrollbar-hide">
          <h1 className="text-3xl font-semibold">
            Favourite Tasks <sub className="text-xs">({allTasks?.length})</sub>
          </h1>
          {content}
        </div>
      </div>
    </>
  );
}
