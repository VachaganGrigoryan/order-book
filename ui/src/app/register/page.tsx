import Form from "@/app/register/form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-center justify-center rounded-lg bg-slate-800 p-3 md:h-36">
          <img src="/logo.svg" alt="logo" />
        </div>
        <Form />
        <div>
          <span className="block text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:text-green-600">
              Log In
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
}
