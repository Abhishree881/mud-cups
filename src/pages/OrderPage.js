import React, { useEffect, useState, useRef, useContext } from "react";
import "../App.css";
import { Link, useParams } from "react-router-dom";
import Logo from "../assets/image/logo.jpeg";
import Hi from "../assets/gifs/hi.gif";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import ItemCardSmall from "../components/itemCardSmall";
import ItemCardLarge from "../components/itemCardLarge";
import AddToCart from "../components/addToCart";
import { connect } from "react-redux";
import { AuthContext } from "../AuthContext";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { loadMenu, setRecommended } from "../Actions/MenuActions";

function OrderPage(props) {
  let { id, franchise } = useParams();
  const [firstLoad, setFirstLoad] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [isInFrame, setInFrame] = useState(false);
  const [expanded, setExpanded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [franchiseImage, setFranchiseImage] = useState();

  const { currentUser } = useContext(AuthContext);

  const HandleCategoryClick = (index) => {
    const categoryRef = containerRef.current.children[index];
    categoryRef.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleFetch = async () => {
    let array = [];
    const collectionRef = await getDocs(collection(db, franchise));
    collectionRef.forEach((doc) => {
      array.push(doc.data());
    });
    array.sort((a, b) => a.categoryIndex - b.categoryIndex);
    props.loadMenu(array);
    const recData = [];
    array.map((category) => {
      category.items.map((item) => {
        if (item.isRecommended) recData.push(item);
      });
    });
    props.setRecommended(recData);
    setLoading(false);
  };

  const handleImageFetch = async () => {
    const collectionRef = await getDocs(collection(db, "franchices"));
    collectionRef.forEach((doc) => {
      if (doc.data().franchiseName === franchise) {
        setFranchiseImage(doc.data().imageUrl);
      }
    });
  };

  useEffect(() => {
    setFirstLoad(false);
    if (firstLoad) {
      handleFetch();
      handleImageFetch();
    }
  }, [firstLoad]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const arr = [];
      props.menu.forEach((itr, index) => {
        arr[index] =
          containerRef.current.children[index].offsetTop;
      });
      arr[0] = 0;
      let temp = 0;
      for (let i = 0; i < arr.length; i++) {
        if (scrollPosition + 50 > arr[i])
          temp = i;
        else
          break;
      }
      setActiveCategoryIndex(temp)
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [props.menu]);

  const containerRef = useRef(null);

  return loading ? (
    <div className="loader"></div>
  ) : (
    <div className="w-[100vw] h-fit overflow-y-scroll flex justify-center relative">
      <div className="w-full max-w-[450px] h-full flex flex-col relative">
        {/* Top navbar starts here */}
        <div className="flex h-[50px] items-center border justify-between px-[12px]">
          <div className="flex items-center gap-2">
            <Link to={`/${id}`}>
              <div
                className="w-[40px] h-[40px] rounded-[50%]"
                style={{
                  backgroundImage: `url(${franchiseImage})`,
                  backgroundSize: "100% 100%",
                }}
              ></div>
            </Link>
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
        {/* Search bar starts here */}
        <Link to={`/${id}/search`}>
          <div className="flex h-[36px] items-center border border-[#a2630b] mx-[12px] my-[6px] rounded-[10px]">
            <div className="px-[6px] search-icon relative h-[80%] flex items-center">
              <IoSearch fontSize={"18px"} color={"#4b3619"} />
            </div>
            <div className="italic text-[14px] pl-[6px]">Search</div>
          </div>
        </Link>

        {/* for you heading */}
        <div className="h-fit w-full my-[6px] flex items-center justify-center relative">
          <div className="h-[1px] w-full absolute top-[50%] horizontal-line"></div>
          <span className="text-[#a2630b] text-[12px] font-[700] bg-white z-[1] px-2 tracking-wider">
            FOR YOU
          </span>
        </div>
        {/* option to choose recommended or favourites */}
        <div className="flex w-full h-[30px] my-[6px] justify-center">
          <div className="border w-full max-w-[224px] h-full rounded-[10px] flex text-[12px] overflow-hidden">
            <div
              className={`w-full h-full flex items-center justify-center border gap-1 ${isActive && "activeChannelLeft"
                }`}
              onClick={() => setIsActive(true)}
            >
              Recommended
            </div>
            <div
              className={`w-full h-full flex items-center justify-center border gap-1 ${!isActive && "activeChannelRight"
                }`}
              onClick={() => setIsActive(false)}
            >
              <div className="pt-[1px]">
                {isActive ? (
                  <FaRegHeart fontSize={"12px"} />
                ) : (
                  <FaHeart fontSize={"12px"} fill={"#eb1727"} />
                )}{" "}
              </div>
              Favourites
            </div>
          </div>
        </div>
        {/* recommended/favourites section */}
        <div className="overflow-scroll h-[170px] my-[10px] px-[12px] flex gap-[12px]">
          {isActive &&
            props.recommended.map((index) => {
              return <ItemCardSmall data={index} isVisible={isInFrame} setIsVisible={setInFrame} />;
            })}
          {!isActive &&
            (props.favourites.length > 0 ? (
              props.favourites.map((index) => {
                return <ItemCardSmall data={index} isVisible={isInFrame} setIsVisible={setInFrame} />;
              })
            ) : (
              <div className="w-full h-full flex items-center justify-center italic">
                No favourites added yet
              </div>
            ))}
        </div>
        {/* Explore heading */}
        <div className="h-fit w-full my-[6px] flex items-center justify-center relative">
          <div className="h-[1px] w-full absolute top-[50%] horizontal-line"></div>
          <span className="text-[#a2630b] text-[12px] font-[700] bg-white z-[1] px-2 tracking-wider">
            EXPLORE
          </span>
        </div>
        {/* menu contents */}
        <div
          className="w-full flex flex-col px-[12px] gap-[16px] pb-[60px] pt-[6px]"
          ref={containerRef}
        >
          {props.menu.map((index) => {
            return (
              <div className="w-full h-fit flex flex-col gap-[16px]">
                <div className="w-full h-[20px] font-[700] text-[#55555585]">
                  {index.categoryName}
                </div>
                {index?.items?.map((item) => {
                  return (
                    <ItemCardLarge
                      data={item}
                      expanded={expanded}
                      setExpanded={setExpanded}
                      len={index.items.length}
                      categoryIndex={index.categoryIndex}
                      isVisible={isInFrame}
                      setIsVisible={setInFrame}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {/* bottom navbar */}
      <div className="fixed z-[100] h-[50px] border w-full bottom-[0] flex items-center max-w-[450px] bg-white">
        <div className="flex-[4] w-full h-full flex overflow-scroll pl-[6px] gap-[12px]">
          {props.menu.map((index, idx) => {
            return (
              <div
                className="w-fit flex items-center text-[14px] justify-center h-full"
                onClick={() => {
                  HandleCategoryClick(idx);
                }}
              >
                <span
                  className={`w-fit whitespace-nowrap px-[8px] cursor-pointer text-center ${activeCategoryIndex === idx &&
                    "bg-[#fcecd5] text-[#a2630b] font-[600] pb-[2px] rounded-[6px]"
                    }`}
                >
                  {index.categoryName}
                </span>
              </div>
            );
          })}
        </div>

        <Link to={`/${id}/cart`}>
          <div className="flex-[1] w-full h-[40px] bg-[#a2630b] rounded-tl-[12px] rounded-bl-[12px] flex items-center justify-center gap-[4px] px-[6px]">
            <FaShoppingCart color="white" />
            <div className="text-white font-[500] pl-1">
              Cart {`(${props.currentCart?.length})`}{" "}
            </div>
          </div>
        </Link>
        <div
          className={`absolute bottom-[0px] transition-all duration-500 bg-transparent z-[200] h-fit w-full ${isInFrame ? "right-[0px]" : "right-[100%]"
            } `}
        >
          <AddToCart isVisible={isInFrame} setIsVisible={setInFrame} />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  currentCart: state.cartReducer.currentCart,
  menu: state.menuReducer.menu,
  favourites: state.menuReducer.favourites,
  recommended: state.menuReducer.recommended,
});

const mapDispatchToProps = {
  loadMenu,
  setRecommended,
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
