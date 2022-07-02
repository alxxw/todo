import React, { Fragment } from "react";

const DeleteAll = () => {
  const DeleteAll = async () => {
    try {
      const reponse = await fetch("http://localhost:5000/obliterate", {
        method: "DELETE",
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <button
        className="btn mt-5 position-absolute text-light bg-danger"
        onClick={DeleteAll}
      >
        obliteration
      </button>
    </Fragment>
  );
};

export default DeleteAll;
