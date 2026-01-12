import React from "react";
import { Toaster as HotToaster } from "react-hot-toast";

const Toaster = () => {
  return (
    <HotToaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000, // default duration
        style: {
          background: "#1a1a1a",
          color: "#ff7300",
          fontSize: "14px",
          fontWeight: "500",
          border: "1px solid #ff7300",
          borderRadius: "10px",
          padding: "16px 20px",
        },
        success: {
          style: {
            background: "#ff7300",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#ff7300",
          },
        },
        error: {
          style: {
            background: "#ff4d4f",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#ff4d4f",
          },
        },
        loading: {
          style: {
            background: "#333",
            color: "#ff7300",
          },
        },
      }}
    />
  );
};

export default Toaster;
