// eslint-disable-next-line react/prop-types
export default function Modal({ setIsOpen }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm z-50">
      <div className="bg-gray-800 md:w-[500px] w-[400px] p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl mb-4 text-white">Add New Goal</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-white">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full p-2 rounded-md bg-gray-700 text-white"
              placeholder="Goal Title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-white">
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 rounded-md bg-gray-700 text-white"
              rows="4"
              placeholder="Goal Description"
            ></textarea>
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
              className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md"
            >
              Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
