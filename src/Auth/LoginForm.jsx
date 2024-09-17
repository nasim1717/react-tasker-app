export default function LoginForm() {
  return (
    <form>
      <div className="mb-4">
        <label htmlFor="email" className="block text-white">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full p-2 rounded-md bg-gray-700 text-white"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-white">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full p-2 rounded-md bg-gray-700 text-white"
          placeholder="Enter your password"
        />
      </div>
      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500">
        Login
      </button>
    </form>
  );
}
