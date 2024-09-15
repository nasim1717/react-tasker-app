// eslint-disable-next-line react/prop-types
export default function Goals({ goalsName }) {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="overflow-scroll h-[630px] scrollbar-hide">
          <h1 className="text-3xl font-semibold">
            {goalsName} <sub className="text-xs">(2)</sub>
          </h1>
          <div className="bg-gray-800 xl:w-[700px] px-4 py-3 lg:w-[600px] md:w-[450px] w-full border-[1px] border-gray-700 rounded-md mt-6">
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold text-gray-100">JavaScript</h1>
              <div className="space-x-4">
                <span>
                  <i className="fa-solid fa-pen-to-square"></i>
                </span>
                <span>
                  <i className="fa-solid fa-trash"></i>
                </span>
              </div>
            </div>
            <p className="mt-3 text-gray-300">JavaScript is non-blocking single-thread language</p>
            <p className="mt-3 text-gray-100">a few seconds ago</p>
            <div className="mt-3 space-x-3">
              <button>
                <i className="fa-regular fa-heart mx-1"></i> Fav
              </button>
              <button>
                <i className="fa-regular fa-circle-check mx-1"></i> Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
