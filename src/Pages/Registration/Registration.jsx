import { Link } from "react-router-dom";

import RegisterForm from "../../Auth/RegisterForm";

export default function Registration() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-md w-full max-w-md">
        <h1 className="text-3xl text-white mb-6 text-center">Register</h1>
        <RegisterForm />
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
