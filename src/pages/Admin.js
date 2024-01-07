import React from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  const navigateToEditMenu = () => {
    navigate("./category");
  };
  return (
    <div className="w-[100%] h-[100%] flex flex-col">
      Here comes the admin dashboard jahan poore statistics aayenge
      <button
        className="border w-[100px] mx-4 my-2 bg-gray-200 rounded"
        onClick={navigateToEditMenu}
      >
        Edit menu
      </button>
    </div>
  );
}

export default AdminPage;
