import { useState } from "react";
import { useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    setLoader(true);
    const isMatchPassword = data.password === data.confirmpasssword;
    if (isMatchPassword) {
      const user = {
        name: data?.name,
        email: data?.email,
        password: data?.password,
      };
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/signup`, {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responsjosnConvert = await response.json();
        if (responsjosnConvert.status) {
          toast.success(responsjosnConvert?.message, {
            position: "top-right",
          });
          setLoader(false);
        } else {
          throw responsjosnConvert?.message;
        }
      } catch (err) {
        setLoader(false);
        toast.error(err, {
          position: "top-right",
        });
      }
    } else {
      setError("confirmpasssword", { message: "Password not matched!" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-white">
          Full Name
        </label>
        <input
          {...register("name", { required: "Name field is required" })}
          name="name"
          id="name"
          type="text"
          className="w-full p-2 rounded-md bg-gray-700 text-white"
          placeholder="Enter your full name"
        />
        {errors?.name && <p className="text-red-500 text-sm mt-1">{errors?.name?.message}</p>}
      </div>
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
      <div className="mb-4">
        <label htmlFor="confirm-password" className="block text-white">
          Confirm Password
        </label>
        <input
          {...register("confirmpasssword", {
            required: "Password field is reqired",
            minLength: {
              value: 6,
              message: "Minimum length 6 character",
            },
          })}
          name="confirmpasssword"
          id="confirm-password"
          type="password"
          className="w-full p-2 rounded-md bg-gray-700 text-white"
          placeholder="Confirm your password"
        />
        {errors?.confirmpasssword && (
          <p className="text-red-500 text-sm mt-1">{errors?.confirmpasssword?.message}</p>
        )}
      </div>
      <button
        disabled={loader}
        className={`flex justify-center items-center gap-5 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500`}
      >
        <p> Register</p>
        {loader && <ThreeDots color="white" width={40} height={15} radius={15} visible={true} />}
      </button>
    </form>
  );
}
