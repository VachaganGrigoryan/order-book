"use client";

import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { axios } from "@/lib/axios";

type OrderFormVariables = {
  stock_name: string;
  order_type: "BUY" | "SELL";
  price: number;
  quantity: number;
};

export function OrderForm() {
  const [modalView, setModalView] = useState(false);
  const methods = useForm<OrderFormVariables>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setModalView(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<OrderFormVariables> = async (
    values: OrderFormVariables,
  ) => {
    console.log(values);
    try {
      const res = await axios.post("/order-book/", values);
      if (res?.status !== 201) {
        toast.error("Something goes wrong! Try again.");
      }
      toast.success("Successfully created new order");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <button
        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gradient-radial from-[#F71190] to-[#F7921C] rounded-lg hover:bg-green-400 active:bg-green-600 md:text-sm"
        onClick={() => setModalView(true)}
      >
        New Order
      </button>
      {modalView && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setModalView(false)}
          ></div>
          <div className="flex items-center min-h-screen">
            <div className="relative w-full max-w-lg min-w-fit mx-auto bg-white rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700 border border-gray-400">
              <div className="flex flex-row min-w-fit items-start justify-center text-center p-4 border-b-2 border-[#C6C6C6F0] dark:border-gray-700">
                <div className="flex-grow flex flex-col gap-2">
                  <h2 className="title-font font-medium text-3xl text-[#3D3D3D] dark:text-gray-100 text-center group-hover/card:text-primary">
                    Make New order
                  </h2>
                </div>

                <div className="flex-shrink-1 flex justify-end">
                  <button
                    className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                    onClick={() => setModalView(false)}
                  >
                    X
                  </button>
                </div>
              </div>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                  <div className="relative p-4 max-w-prose mx-auto flex flex-col gap-3">
                    <div className="flex gap-y-1.5 flex-col">
                      <label
                        htmlFor="stockName"
                        className="text-gray-800 dark:text-white  text-sm font-bold leading-tight tracking-normal"
                      >
                        Stock Name
                      </label>
                      <div className="relative">
                        <input
                          id="stockName"
                          type="text"
                          required
                          className="w-full peer px-2 h-10 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                          {...register("stock_name")}
                        />
                      </div>
                    </div>

                    <div className="flex gap-y-1.5 flex-col">
                      <label
                        htmlFor="orderType"
                        className="text-gray-800 dark:text-white  text-sm font-bold leading-tight tracking-normal"
                      >
                        Order Type
                      </label>
                      <div className="relative">
                        <select
                          id="orderType"
                          {...register("order_type")}
                          required
                          className="w-full px-2 h-10 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                        >
                          <option value="">Select ...</option>
                          <option value="BUY">BUY</option>
                          <option value="SELL">SELL</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-y-1.5 flex-col">
                      <label
                        htmlFor="price"
                        className="text-gray-800 dark:text-white  text-sm font-bold leading-tight tracking-normal"
                      >
                        Price
                      </label>
                      <div className="relative">
                        <input
                          id="price"
                          type="number"
                          required
                          className="w-full px-2 h-10 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                          {...register("price")}
                        />
                      </div>
                    </div>
                    <div className="flex gap-y-1.5 flex-col">
                      <label
                        htmlFor="quantity"
                        className="text-gray-800 dark:text-white  text-sm font-bold leading-tight tracking-normal"
                      >
                        Quantity
                      </label>
                      <div className="relative">
                        <input
                          id="quantity"
                          type="number"
                          required
                          className="w-full px-2 h-10 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                          {...register("quantity")}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="inline-block px-4 py-2 text-white duration-150 font-medium  bg-gradient-radial from-[#F71190] to-[#F7921C] rounded-lg hover:bg-green-400 active:bg-green-600 md:text-sm"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
