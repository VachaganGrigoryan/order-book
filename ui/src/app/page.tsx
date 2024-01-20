"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks";
import { OrderForm } from "@/app/OrderForm";
import useOrderBook from "@/hooks/useOrderBook";
import useHistory from "@/hooks/useHistory";

export default function ClientSideRoot(): any {
  const router = useRouter();
  const { user } = useUser();
  const { orderBook, error: err } = useOrderBook();
  const { histories } = useHistory();

  const { data: session } = useSession();

  if (!session) return router.push("/login");

  return (
    <main className="bg-black-500">
      <header>
        <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 flex md:space-x-6">
          <div className="flex w-full justify-between">
            <a href="javascript:void(0)">
              <img src="/logo.svg" width={300} height={50} alt="logo" />
            </a>
            <div>
              <Link
                href="#"
                onClick={() => signOut()}
                className="py-3 px-6 rounded-md shadow-md text-white text-center bg-[#F7921C] focus:shadow-none block md:inline"
              >
                Sign out
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <section className="mt-12 mx-auto max-w-screen-xl px-4 sm:px-8 flex flex-col gap-2">
        <div className="text-center space-y-4">
          <div className="text-md">
            Hi {user?.first_name}, welcome to your board.
          </div>
          <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
            Stock Market
            <span className="text-[#F71190]"> Make Your Order</span>
          </h1>
        </div>
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              All Orders
            </h3>
            <p className="text-gray-600 mt-2">See your orders in here.</p>
          </div>
          <div className="mt-3 md:mt-0">
            <OrderForm />
          </div>
        </div>
        <div className="my-5 relative h-max overflow-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 pr-6">ID</th>
                <th className="py-3 pr-6">Stock Name</th>
                <th className="py-3 pr-6">Order Type</th>
                <th className="py-3 pr-6">Price</th>
                <th className="py-3 pr-6">Quantity</th>
                <th className="py-3 pr-6">Created At</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {orderBook.map((item, idx) => (
                <tr key={idx}>
                  <td className="pr-6 py-4 whitespace-nowrap">{item.id}</td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {item.stock_name}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-2 rounded-full font-semibold text-xs ${item.order_type == "BUY" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}
                    >
                      {item.order_type}
                    </span>
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">{item.price}</td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {item.created_at}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full text-center">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Transactions History
          </h3>
        </div>
        <div className="my-5 relative h-max overflow-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 pr-6">TX ID</th>
                <th className="py-3 pr-6">Order</th>
                <th className="py-3 pr-6">Stock Name</th>
                <th className="py-3 pr-6">Order Type</th>
                <th className="py-3 pr-6">Price</th>
                <th className="py-3 pr-6">Quantity</th>
                <th className="py-3 pr-6">Created At</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {histories.map((item, idx) => (
                <tr key={idx}>
                  <td className="pr-6 py-4 whitespace-nowrap">{item.id}</td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {item.order.id}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {item.order.stock_name}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-2 rounded-full font-semibold text-xs ${item.order.order_type == "BUY" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}
                    >
                      {item.order.order_type}
                    </span>
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {item.order.price}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {item.created_at}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
