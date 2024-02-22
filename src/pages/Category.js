import React, { useState, useRef, useEffect } from "react";
import CategoryCard from "../components/categoryCard";
import { FaPlus } from "react-icons/fa6";
import "../assets/styles/category.css";
import logo from "../assets/image/logo.jpeg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import DialogBox from "../components/dialogBox";
import TextField from "@mui/material/TextField";
import addImage from "../assets/image/addImage.png";
import { db, storage } from "../firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { CgSpinner } from "react-icons/cg";

function Category(props) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [categoryIndex, setCategoryIndex] = useState(1);
  const [franchiseImage, setFranchiseImage] = useState(null);
  const [addDialog, setAddDialog] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { id } = useParams();
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFirstLoad(false);
    if (firstLoad) {
      handleFetch();
      handleImageFetch();
    }
  }, [firstLoad]);

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
    if (categoryName.length === 0) {
      alert("Name is mandatory");
      return;
    }
    if (categoryDesc.length === 0) {
      alert("Description is mandatory");
      return;
    }
    if (image === null) {
      alert("Image is mandatory");
      return;
    }

    setLoading(true);

    try {
      const imageRef = ref(
        storage,
        `category-images/${categoryName}_${Date.now()}`
      );

      await uploadBytesResumable(imageRef, image).then(() => {
        getDownloadURL(imageRef).then(async (downloadURL) => {
          await setDoc(doc(db, id, categoryName), {
            franchiseName: id,
            categoryIndex,
            categoryName,
            categoryDesc,
            imageUrl: downloadURL,
            items: [],
          });
          Swal.fire({
            icon: "success",
            title: "Category Added Succesfully",
            text: "Category added with name: " + categoryName,
          });
          // setData([
          //   ...data,
          //   { categoryName, categoryDesc, imageUrl: downloadURL },
          // ]);
          handleFetch();
        });
        setAddDialog(false);
        setLoading(false);
        setImage(null);
        setImageUrl("");
        setCategoryName(null);
        setCategoryDesc(null);
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

  const handleFetch = async () => {
    let array = [];
    const collectionRef = await getDocs(collection(db, id));
    collectionRef.forEach((doc) => {
      array.push(doc.data());
    });
    setCategoryIndex(array.length + 1);
    setData(array);
  };

  const handleImageFetch = async () => {
    const collectionRef = await getDocs(collection(db, "franchices"));
    collectionRef.forEach((doc) => {
      if (doc.data().franchiseName === id) {
        setFranchiseImage(doc.data().imageUrl);
      }
    });
  };

  const handleNameKeyDown = (event) => {
    if (event.key === "Enter") {
      document.getElementById("CategoryDesc").focus();
    }
  };

  const handleDescKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="category relative h-full">
        <Link to="/admin">
          <div className="category-header py-1 px-2">
            <div
              className="img"
              style={{ backgroundImage: `url(${franchiseImage})` }}
            />
            <span>{id}</span>
          </div>
        </Link>
        <div className="h-fit w-full my-[10px] flex items-center justify-center relative">
          <div className="h-[1px] w-full absolute top-[50%] horizontal-line"></div>
          <span className="text-[#a2630b] text-[12px] font-[700] bg-[#f3eee6] z-[1] px-2 tracking-wider">
            All Categories
          </span>
        </div>
        <div className="flex flex-col gap-[10px] px-5 py-2 h-auto mb-6 z-10">
          {data.length !== 0 ? (
            data?.map((index) => {
              return (
                <CategoryCard
                  data={index}
                  key={index.categoryIndex}
                  franchise={id}
                />
              );
            })
          ) : (
            <div
              style={{
                width: "100%",
                height: "75vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
              }}
            >
              No categories to show
            </div>
          )}
        </div>
        <div className="fixed z-[100] bottom-[20px] right-[20px]">
          <div
            onClick={() => setAddDialog(true)}
            className="add-category-button w-[48px] h-[48px] bg-blue-700 rounded-[15px] flex items-center justify-center"
          >
            <FaPlus fontSize={"25px"} color="white" />
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
                id="CategoryName"
                label="Category Name"
                variant="outlined"
                onKeyDown={handleNameKeyDown}
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <TextField
                fullWidth
                id="CategoryDesc"
                label="Category Description"
                variant="outlined"
                onKeyDown={handleDescKeyDown}
                value={categoryDesc}
                onChange={(e) => setCategoryDesc(e.target.value)}
              />
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
    </div>
  );
}
const mapStateToProps = (state) => ({
  menu: state.menuReducer.menu,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
