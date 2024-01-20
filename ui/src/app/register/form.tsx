"use client";

import { useSession } from "next-auth/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NEXT_PUBLIC_API_URL } from "@/config";

type RegisterVariables = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
};

export default function Form() {
  const { data: session } = useSession();
  const router = useRouter();
  const methods = useForm<RegisterVariables>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  if (session) return router.push("/");

  const onSubmitHandler: SubmitHandler<RegisterVariables> = async (
    values: RegisterVariables,
  ) => {
    console.log(values);
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/users/register/`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res?.status !== 201) {
        toast.error("Something goes wrong! Try again.");
      }
      toast.success("Successfully created new order");
      return router.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex-1 rounded-lg bg-gray-50 px-6 py-4 mx-auto justify-center align-center">
          <h1 className="mb-3 text-2xl text-center">Sign Up</h1>
          <div className="w-full flex flex-col gap-5">
            <div>
              <label
                className="mb-3 block text-xs font-medium text-gray-900"
                htmlFor="firstname"
              >
                First Name
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
                  id="firstname"
                  type="text"
                  placeholder="Enter your First Name"
                  required
                  {...register("first_name")}
                />
                {errors["first_name"] && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["first_name"]?.message as string}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                className="mb-3 block text-xs font-medium text-gray-900"
                htmlFor="lastname"
              >
                Last Name
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
                  id="lastname"
                  type="text"
                  placeholder="Enter your Last Name"
                  required
                  {...register("last_name")}
                />
                {errors["last_name"] && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["last_name"]?.message as string}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                className="mb-3 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                  required
                  {...register("email")}
                />
                {errors["email"] && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["email"]?.message as string}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                className="mb-3 block text-xs font-medium text-gray-900"
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  {...register("username")}
                />
                {errors["username"] && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["username"]?.message as string}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                className="mb-3 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                  {...register("password")}
                />
                {errors["password"] && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["password"]?.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="rounded-md outline-none border-none bg-green-500 w-[100px] h-[25px] self-center pt-2 pb-8 bg-ct-yellow-600"
              >
                <span className="text-white text-ct-blue-600">Register</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
