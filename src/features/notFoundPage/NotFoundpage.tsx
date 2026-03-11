import React from "react";
import { Link } from "react-router";

const NotFoundPage: React.FC = () => {
  return (
    <div
      className="w-100 vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#F89230",
      }}
    >
      <Link
        className="navbar-brand d-flex align-items-center gap-2 text-white fw-bold"
        to="/"
      >
      <img
        src="/not-found.jpg"
        alt="Página no encontrada"
        style={{
          maxHeight: "50vh",
          width: "auto",
          display: "block",
        }}
      />
      </Link>
    </div>
  );
};

export default NotFoundPage;