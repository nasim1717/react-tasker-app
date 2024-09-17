import { Link } from "react-router-dom";
import LoginForm from "../../Auth/LoginForm";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-md w-full max-w-md">
        <h1 className="text-3xl text-white mb-6 text-center">Login</h1>
        <LoginForm />
        <p className="text-center pt-2 text-white">
          {" "}
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-700 underline">
            Create New
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
