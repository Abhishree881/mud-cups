import React from "react";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

function Items() {
  const { id } = useParams();
  return (
    <div className="">
      <div className="relative w-[100vw] h-[100vh] pt-[36px] bg-[#837762] flex">
        <div className=" flex flex-col flex-[6]">
          <div
            className="text-white font-semibold text-[32px] pl-[20px]"
            style={{ lineHeight: "32px" }}
          >
            {id}
          </div>
          <div className="text-gray-200 font-[400] text-[16px] pl-[20px]">
            12 items
          </div>
        </div>
        <div className="flex-[4] pr-[20px] flex justify-end pt-[1px]">
          <div
            className="w-[90px] h-[43px] rounded-[12px] text-blue-600 font-semibold text-[12px] bg-white flex gap-1 items-center justify-center"
            style={{ lineHeight: "32px" }}
          >
            <FaPlus color="rgb(37,99,235)" /> Add New
          </div>
        </div>
        <div
          className="absolute bg-white w-full min-h-[100%] top-[120px]"
          style={{ borderRadius: "45px 0 0 0" }}
        ></div>
      </div>
    </div>
  );
}

export default Items;
