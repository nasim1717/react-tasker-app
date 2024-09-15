import { Link } from "react-router-dom";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";

export default function Registration() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-md w-full max-w-md">
        <h1 className="text-3xl text-white mb-6 text-center">Register</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 rounded-md bg-gray-700 text-white"
              placeholder="Enter your full name"
            />
          </div>
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
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-white">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              className="w-full p-2 rounded-md bg-gray-700 text-white"
              placeholder="Confirm your password"
            />
          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500">
            Register
          </button>
        </form>
        <div className="flex justify-between mt-4 text-sm">
          <button className="w-full bg-red-600 text-white py-2 rounded-md mx-1 flex justify-center items-center gap-2">
            <FaGoogle /> Register with Google
          </button>
          <button className="w-full bg-blue-700 text-white py-2 rounded-md mx-1 flex justify-center items-center gap-1">
            <FaSquareFacebook /> Register with Facebook
          </button>
        </div>
        <p className="text-center pt-2 text-white">
          {" "}
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 underline">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
