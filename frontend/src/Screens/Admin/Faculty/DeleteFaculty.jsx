import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { baseApiURL } from "../../../baseUrl";
import { FiTrash } from "react-icons/fi";

const DeleteFaculty = () => {
  const [employeeId, setEmployeeId] = useState("");

  const deleteFaculty = (e) => {
    e.preventDefault();

    toast.loading("Deleting Faculty");
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .delete(`${baseApiURL()}/faculty/details/deleteDetails`, {
        headers: headers,
        data: { employeeId: employeeId },
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setEmployeeId("");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  return (
    <form
      onSubmit={deleteFaculty}
      className="w-[70%] flex justify-center items-center flex-wrap gap-6 mx-auto mt-10"
    >
      <div className="w-[40%]">
        <label htmlFor="employeeId" className="leading-7 text-sm ">
          Enter Employee Id to Delete
        </label>
        <input
          type="number"
          id="employeeId"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <button
        type="submit"
        className="bg-red-500 px-6 py-3 rounded-sm my-6 text-white"
      >
        Delete Faculty
      </button>
    </form>
  );
};

export default DeleteFaculty;
