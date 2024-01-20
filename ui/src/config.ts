export const NODE_ENV = process.env.NODE_ENV || "development";
export const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export const NEXT_API_URL =
  NODE_ENV === "development"
    ? process.env.NEXT_API_URL || ""
    : NEXT_PUBLIC_API_URL;

export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || "0.0.0.0";
