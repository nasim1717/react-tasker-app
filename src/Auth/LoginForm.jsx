import { useState } from "react";
import { useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify({
          email: data?.email,
          password: data?.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseParse = await response.json();
      if (responseParse?.status) {
        toast.success(responseParse?.message, {
          position: "top-right",
        });
        console.log("response-login-->", responseParse);
        localStorage.setItem(
          "user",
          JSON.stringify({ user: responseParse.data, accessToken: responseParse.accessToken })
        );
        setLoader(false);
        navigate("/");
      } else {
        throw responseParse?.message;
      }
    } catch (err) {
      toast.error(err, {
        position: "top-right",
      });
      setLoader(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-white">
          Email
        </label>
        <input
          {...register("email", { required: "Eamil field is required" })}
          name="email"
          id="email"
          type="email"
          className="w-full p-2 rounded-md bg-gray-700 text-white"
          placeholder="Enter your email"
        />
        {errors?.email && <p className="text-red-500 text-sm mt-1">{errors?.email?.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-white">
          Password
        </label>
        <input
          {...register("password", {
            required: "Password field is reqired",
            minLength: {
              value: 6,
              message: "Minimum length 6 character",
            },
          })}
          name="password"
          id="password"
          type="password"
          className="w-full p-2 rounded-md bg-gray-700 text-white"
          placeholder="Enter your password"
        />
        {errors?.password && (
          <p className="text-red-500 text-sm mt-1">{errors?.password?.message}</p>
        )}
      </div>
      <button
        disabled={loader}
        className={`flex justify-center items-center gap-5 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500`}
      >
        <p> Login</p>
        {loader && <ThreeDots color="white" width={40} height={15} radius={15} visible={true} />}
      </button>
    </form>
  );
}
