"use client";

import { signIn, useSession } from "next-auth/react";
import AuthError from "next-auth";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type LoginVariables = {
  username: string;
  password: string;
};

export default function Form() {
  const { data: session } = useSession();
  const router = useRouter();
  const methods = useForm<LoginVariables>();

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

  async function LoginUserFunction(credentials: LoginVariables) {
    try {
      await signIn("login", {
        ...credentials,
        redirect: true,
      });
      toast.success("Logged in successfully");
      return router.push("/");
    } catch (error) {
      toast.error(`Something went wrong: ${error.message}`);
    }
  }

  const onSubmitHandler: SubmitHandler<LoginVariables> = (
    values: LoginVariables,
  ) => {
    LoginUserFunction(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex-1 rounded-lg bg-gray-50 px-6 py-4 mx-auto justify-center align-center">
          <h1 className="mb-3 text-2xl text-center">Log In</h1>
          <div className="w-full flex flex-col gap-5">
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
                <span className="text-white text-ct-blue-600">Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
