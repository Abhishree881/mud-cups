import React from "react";
import Logo from "../assets/image/logo.jpeg";
import CartCard from "../components/cartCard";
import { FaShoppingCart } from "react-icons/fa";
import { connect } from "react-redux";
import { db } from "../firebase";
import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { setCart } from "../Actions/CartActions";
import { useParams } from "react-router-dom";

function Cart(props) {
  const { id } = useParams();
  const totalCost = props.currentCart.reduce(
    (total, item) => total + parseFloat(item.itemPrice) * item.count,
    0
  );

  const handleClick = async (e) => {
    for (const index of props.currentCart) {
      var data = [];
      const docRef = doc(db, `${index.counter} Orders`, "orders");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        data = docSnap.data().items;
      } else {
        console.log("No such document!");
      }

      const categoryCollectionRef = collection(db, `${index.counter} Orders`);
      const categoryDocRef = doc(categoryCollectionRef, "orders");
      const updatedData = {
        categoryName: index.categoryName,
        franchiseName: index.franchiseName,
        itemName: index.itemName,
        itemDesc: index.itemDesc,
        imageUrl: index.imageUrl,
        isVeg: index.isVeg,
        itemPrice: index.itemPrice,
        rating: index.rating,
        totalRatings: index.totalRatings,
        isAvailable: index.isAvailable,
        addOn: index.addOn,
        tableNumber: id,
        count: index.count,
      };

      data.push(updatedData);

      const updatedList = {
        items: data,
      };
      await setDoc(categoryDocRef, updatedList);
    }
    props.setCart([])
  };

  return (
    <div className="w-[100vw] h-fit overflow-y-scroll flex justify-center relative">
      <div className="w-full max-w-[450px] h-full flex flex-col relative">
        <div className="flex h-[50px] items-center border justify-between px-[12px]">
          <div className="flex items-center gap-2">
            <div
              className="w-[40px] h-[40px] rounded-[50%]"
              style={{
                backgroundImage: `url(${Logo})`,
                backgroundSize: "100% 100%",
              }}
            ></div>
            <div className="font-[600] text-[18px]">Your Cart</div>
          </div>
          <div className="w-fit h-[30px] rounded-[6px] bg-[#fcecd5] px-[8px] flex items-center justify-center text-[14px] font-[700] gap-[4px]">
            <FaShoppingCart /> {`(${props.currentCart.length})`}
          </div>
        </div>
        <div className="w-full h-full flex flex-col relative px-[12px] gap-[12px] py-[12px] mb-[36px]">
          {props.currentCart.map((index, i) => {
            return (
              <div>
                <CartCard i={i} />
                <div className="w-full h-[1px] bg-gray-200 mt-[12px]"></div>
              </div>
            );
          })}
        </div>

        <div className="w-full h-[50px] max-w-[450px] fixed border bottom-0 flex items-center justify-center bg-white">
          <div
            onClick={handleClick}
            className="flex-[70] max-w-[200px] h-[40px] bg-[#a2630e] rounded-[3px] text-white font-[700] flex items-center justify-center"
          >
            Pay & Order {totalCost.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  currentCart: state.cartReducer.currentCart,
});

const mapDispatchToProps = {
  setCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
