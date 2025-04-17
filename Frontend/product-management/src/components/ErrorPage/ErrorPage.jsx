import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1>⚠️</h1>
      <h2>Oops, something went wrong!</h2>
      <h3>Please Check if the Product is Out of Stock.</h3>
      <button
        onClick={() => navigate("/")}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;
