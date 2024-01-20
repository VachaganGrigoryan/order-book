import Axios from "axios";
import { NEXT_PUBLIC_API_URL } from "@/config";
import { getSession } from "next-auth/react";

// Create a new Axios instance
const axiosInstance = Axios.create({
  baseURL: NEXT_PUBLIC_API_URL, // Replace with your backend server's base URL
});

// Create the interceptor
axiosInstance.interceptors.request.use(async (request) => {
  // Get the session
  const session = await getSession();

  // Add your desired session value to the request headers
  if (session) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${session.jwt}`,
    };
  }

  return request;
});

export const axios = axiosInstance;
