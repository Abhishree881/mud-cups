import React, { useEffect, useRef, useState } from "react";
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
import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { CgSpinner } from "react-icons/cg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

function Items(props) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [itemIndex, setItemIndex] = useState(1);
  const [franchiseImage, setFranchiseImage] = useState(null);
  const [addDialog, setAddDialog] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemName, setItemName] = useState(null);
  const [itemDesc, setItemDesc] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [foodType, setFoodType] = useState(null);
  const [isRecommended, setIsRecommended] = useState(null);
  const fileInputRef = useRef(null);
  const { franchise, id } = useParams();

  useEffect(() => {
    setFirstLoad(false);
    if (firstLoad) {
      handleFetch();
      handleImageFetch();
    }
  }, [firstLoad]);
  const i = props.menu.findIndex((item) => item.name === id);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (itemName === null) {
      alert("Name is mandatory");
      return;
    }
    if (itemDesc === null) {
      alert("Description is mandatory");
      return;
    }
    if (image === null) {
      alert("Image is mandatory");
      return;
    }
    if (itemPrice === null) {
      alert("Price is mandatory");
      return;
    }
    if (foodType === null) {
      alert("Food Type is mandatory");
      return;
    }
    setLoading(true);

    try {
      const imageRef = ref(storage, `item-images/${itemName}_${Date.now()}`);

      await uploadBytesResumable(imageRef, image).then(() => {
        getDownloadURL(imageRef).then(async (downloadURL) => {
          const categoryCollectionRef = collection(db, franchise);
          const categoryDocRef = doc(categoryCollectionRef, id);
          const updatedData = {
            itemIndex,
            itemName,
            itemDesc,
            imageUrl: downloadURL,
            isveg: foodType === "Veg" ? true : false,
            isFavourite: false,
            isRecommended: isRecommended === "Yes" ? true : false,
            itemPrice,
            rating: 0.0,
            totalRatings: 0,
            isAvailable: true,
            addOn: [],
          };
          const updatedList = {
            items: [...data, updatedData],
          };
          await setDoc(categoryDocRef, updatedList, { merge: true });
          Swal.fire({
            icon: "success",
            title: "Category Added Succesfully",
            text: "Category added with name: " + itemName,
          });
          // setData([
          //   ...data,
          //   { itemName, itemDesc, imageUrl: downloadURL },
          // ]);
          handleFetch();
        });
        setAddDialog(false);
        setLoading(false);
        setImage(null);
        setImageUrl("");
        setItemName(null);
        setItemDesc(null);
        setItemPrice(null);
        setFoodType(null);
        setIsRecommended(null);
      });
    } catch (error) {
      console.error("Error adding restaurant: ", error);
      Swal.fire({
        icon: "error",
        title: "Error adding restaurant",
        text: error,
      });
    }
  };

  const handleImageFetch = async () => {
    const collectionRef = await getDocs(collection(db, "franchices"));
    collectionRef.forEach((doc) => {
      if (doc.data().franchiseName === franchise) {
        setFranchiseImage(doc.data().imageUrl);
      }
    });
  };

  const handleFetch = async () => {
    const docRef = doc(db, franchise, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData(docSnap.data().items);
      setItemIndex(docSnap.data().items.length + 1);
    } else {
      console.log("No such document!");
    }
  };

  const handleNameKeyDown = (event) => {
    if (event.key === "Enter") {
      document.getElementById("ItemDesc").focus();
    }
  };

  const handleDescKeyDown = (event) => {
    if (event.key === "Enter") {
      document.getElementById("foodType").focus();
    }
  };

  const handlePriceKeyDown = (event) => {
    if (event.key === "Enter") {
      // handleSubmit();
      document.getElementById("isRecommended").focus();
    }
  };

  const handleTypeChange = (event) => {
    setFoodType(event.target.value);
  };

  const handleRecommendedChange = (event) => {
    setIsRecommended(event.target.value);
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
            {data.length}
            {" items"}
          </div>
        </div>
        <div className="flex-[4] pr-[20px] flex justify-end pt-[1px]">
          <div
            onClick={() => setAddDialog(true)}
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
          {data.map((index) => {
            return <ItemCard data={index} key={index.itemIndex} />;
          })}
          <hr className="mt-3 mb-1" />
          <span className="flex items-center text-center flex-col w-[100%] pb-2">
            You have reached end of the list
          </span>
        </div>
      </div>
      {addDialog && (
        <DialogBox isOpen={addDialog} setClose={setAddDialog}>
          <div className="input-container">
            <div>
              <img
                className="input-image"
                src={imageUrl || addImage}
                onClick={handleImageClick}
              />
              <input
                type="file"
                accept="image/*"
                id="image"
                onChange={handleImageChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
            </div>
            <TextField
              fullWidth
              id="ItemName"
              label="Item Name"
              variant="outlined"
              onKeyDown={handleNameKeyDown}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              fullWidth
              id="ItemDesc"
              label="Item Description"
              variant="outlined"
              onKeyDown={handleDescKeyDown}
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="foodTypeLabel">Food Type</InputLabel>
              <Select
                fullWidth
                labelId="foodTypeLabel"
                id="foodType"
                value={foodType}
                label="Food Type"
                onChange={handleTypeChange}
              >
                <MenuItem value={"Veg"}>Veg</MenuItem>
                <MenuItem value={"Nonveg"}>Non Veg</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="ItemPrice"
              label="Item Price"
              variant="outlined"
              onKeyDown={handlePriceKeyDown}
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="foodTypeLabel">
                Add to Recommended List?
              </InputLabel>
              <Select
                fullWidth
                labelId="isRecommendedLabel"
                id="isRecommended"
                value={isRecommended}
                label="Add to Recommended List?"
                onChange={handleRecommendedChange}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>
            </FormControl>
            <span>Add ons coming soon!</span>
          </div>
          <div className="submit-button">
            <button disabled={loading} onClick={handleSubmit}>
              {loading ? (
                <CgSpinner size={20} className="mt- 1 animate-spin" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </DialogBox>
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  menu: state.menuReducer.menu,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Items);
