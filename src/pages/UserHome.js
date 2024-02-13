import React, { useContext, useEffect, useState } from "react";
import Hi from "../assets/gifs/hi.gif";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { IoSearch } from "react-icons/io5";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import FranchiseCard from "../components/franchiseCard";

const UserHome = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [franchices, setFranchices] = useState();
  const [firstLoad, setFirstLoad] = useState(true);
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);

  const handleFetch = async () => {
    let array = [];
    const collectionRef = await getDocs(collection(db, "franchices"));
    collectionRef.forEach((doc) => {
      array.push(doc.data());
    });
    setFranchices(array);
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (firstLoad) {
      handleFetch();
    }
  }, [firstLoad]);

  return loading ? (
    <div className="loader"></div>
  ) : (
    <div className="w-[100vw] h-fit overflow-y-scroll flex justify-center relative">
      <div className="w-full max-w-[450px] h-full flex flex-col relative">
        <div className="flex h-[50px] items-center border justify-between px-[12px]">
          <div className="flex items-center gap-2">
            <div className="font-[600] text-[18px]">
              {currentUser.displayName}
            </div>
            {isVisible && (
              <div
                className="w-[20px] h-[20px] rounded-[50%]"
                style={{
                  backgroundImage: `url(${Hi})`,
                  backgroundSize: "100% 100%",
                }}
              ></div>
            )}
          </div>
          <div className="flex gap-1">
            <div className="w-fit h-[36px] rounded-[10px] px-9 bg-[#fcecd5] flex items-center justify-center">
              {id}
            </div>
          </div>
        </div>
        <Link to={`/${id}/search`}>
          <div className="flex h-[36px] items-center border border-[#a2630b] mx-[12px] my-[6px] rounded-[10px]">
            <div className="px-[6px] search-icon relative h-[80%] flex items-center">
              <IoSearch fontSize={"18px"} color={"#4b3619"} />
            </div>
            <div className="italic text-[14px] pl-[6px]">Search</div>
          </div>
        </Link>
        <div className="h-fit w-full mt-[6px] flex items-center justify-center relative">
          <div className="h-[1px] w-full absolute top-[50%] horizontal-line"></div>
          <span className="text-[#a2630b] text-[12px] font-[700] bg-white z-[1] px-2 tracking-wider">
            Franchises
          </span>
        </div>
        <div className="h-fit w-full mb-[6px] flex items-center justify-center relative">
          <div className="h-[1px] w-full absolute top-[50%] horizontal-line"></div>
          <span className="text-[#55555585] text-[12px] font-[700] bg-white z-[1] px-2 tracking-wider">
            {franchices?.length}
            {" Franchises to choose from"}
          </span>
        </div>
        <div className="w-full flex flex-col px-[12px] gap-[16px] pb-[60px] pt-[6px]">
          {franchices &&
            franchices.map((index) => {
              return <FranchiseCard data={index} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
