import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import "../assets/styles/item.css";
import ItemCard from "../components/itemCard";
import logo from "../assets/image/logo.jpeg";
import { connect } from "react-redux";
import DialogBox from "../components/dialogBox";
import TextField from "@mui/material/TextField";
import addImage from "../assets/image/addImage.png";
import { db, storage } from "../firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { CgSpinner } from "react-icons/cg";

function Items(props) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [franchiseImage, setFranchiseImage] = useState(null);
  const { franchise, id } = useParams();
  useEffect(() => {
    setFirstLoad(false);
    if (firstLoad) {
      // handleFetch();
      handleImageFetch();
    }
  }, [firstLoad]);
  const i = props.menu.findIndex((item) => item.name === id);

  const handleImageFetch = async () => {
    const collectionRef = await getDocs(collection(db, "franchices"));
    collectionRef.forEach((doc) => {
      if (doc.data().franchiseName === franchise) {
        setFranchiseImage(doc.data().imageUrl);
      }
    });
  };

  return (
    <div className="relative">
      <div className=" w-[100vw] h-[29vh] pt-[36px] bg-[#fcdfb7] flex fixed top-0">
        <div className=" flex flex-col flex-[6]">
          <div
            className="text-[#06161a] font-semibold text-[32px] pl-[20px]"
            style={{ lineHeight: "32px" }}
          >
            {id}
          </div>
          <div className="text-gray-700 font-[400] text-[16px] pl-[20px]">
            12 items
          </div>
        </div>
        <div className="flex-[4] pr-[20px] flex justify-end pt-[1px]">
          <div
            className="add-item-button w-[90px] h-[43px] rounded-[12px] text-blue-600 font-semibold text-[12px] bg-white flex gap-1 items-center justify-center"
            style={{ lineHeight: "32px" }}
          >
            <FaPlus color="rgb(37,99,235)" /> Add New
          </div>
        </div>
      </div>
      <div
        className="absolute bg-[#f3eee6] w-full min-h-[80vh] top-[120px]"
        style={{ borderRadius: "45px 0 0 0" }}
      >
        <Link to="/admin">
          <div
            className="pt-2 px-4 font-bold flex items-center gap-[5px] sticky top-0 bg-[#f3eee6] z-50"
            style={{ borderRadius: "45px 0 0 0" }}
          >
            <div
              className="img"
              style={{
                backgroundImage: `url(${franchiseImage})`,
                aspectRatio: "1/1",
                width: "45px",
                borderRadius: "50%",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <span>{franchise}</span>
          </div>
        </Link>
        <div className="h-fit w-full my-[10px] flex items-center justify-center sticky top-[50px] bg-[#f3eee6] z-50">
          <div className="h-[1px] w-full absolute top-[50%] horizontal-line"></div>
          <span className="text-[#a2630b] text-[12px] font-[700] bg-[#f3eee6] z-[1] px-2 tracking-wider">
            All Items
          </span>
        </div>
        <div className="pt-1">
          {/* {props.menu[i].items.map((index) => {
            return <ItemCard data={index} key={index.index} />;
          })} */}
          <hr className="mt-3 mb-1" />
          <span className="flex items-center text-center flex-col w-[100%] pb-2">
            You have reached end of the list
          </span>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  menu: state.menuReducer.menu,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Items);
