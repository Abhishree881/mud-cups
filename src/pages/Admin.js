import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/styles/admin.css";
import DialogBox from "../components/dialogBox";
import TextField from "@mui/material/TextField";
import addImage from "../assets/image/addImage.png";
import { db, storage } from "../firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { CgSpinner } from "react-icons/cg";

function AdminPage() {
  const navigate = useNavigate();
  const [firstLoad, setFirstLoad] = useState(true);
  const [data, setData] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [franchiseName, setFranchiseName] = useState("");
  const [franchiseDesc, setFranchiseDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

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
    if (franchiseName.length === 0) {
      alert("Name is mandatory");
      return;
    }
    if (franchiseDesc.length === 0) {
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
        `franchise-images/${franchiseName}_${Date.now()}`
      );

      await uploadBytesResumable(imageRef, image).then(() => {
        getDownloadURL(imageRef).then(async (downloadURL) => {
          await setDoc(doc(db, "franchices", franchiseName), {
            franchiseName,
            franchiseDesc,
            imageUrl: downloadURL,
            index: Date.now(),
          });
          Swal.fire({
            icon: "success",
            title: "Franchise Added Succesfully",
            text: "Franchise added with name: " + franchiseName,
          });
          // setData([
          //   ...data,
          //   { franchiseName, franchiseDesc, imageUrl: downloadURL },
          // ]);
          handleFetch();
        });
        setAddDialog(false);
        setLoading(false);
        setImage(null);
        setImageUrl("");
        setFranchiseName(null);
        setFranchiseDesc(null);
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

  const navigateToEditMenu = (id) => {
    navigate(`./${id}/category`);
  };

  const handleFetch = async () => {
    let array = [];
    const collectionRef = await getDocs(collection(db, "franchices"));
    collectionRef.forEach((doc) => {
      // console.log(doc.data());
      array.push(doc.data());
    });
    setData(array);
  };

  useEffect(() => {
    setFirstLoad(false);
    if (firstLoad) {
      handleFetch();
    }
  }, [firstLoad]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      setScroll(true);
    }, [500]);
  };

  const handleNameKeyDown = (event) => {
    if (event.key === "Enter") {
      document.getElementById("FranchiseDesc").focus();
    }
  };

  const handleDescKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="admin-page">
      {!scroll && (
        <div className="admin-dashboard">
          <div className="admin-welcome">
            <h1>Hello!</h1>
            <h3>Welcome to the Admin Dashboard</h3>
            <h5>
              You can manage as many franchises as you want, and we will manage
              the hassle of delivering to the right counter :)
            </h5>
            <p>You can start your journey by clicking the button {"-)"}</p>
            <button onClick={() => handleClick("admin")}>Click me ;)</button>
            <Link to="/counter">
              <button
                style={{ top: "10px", right: "10px", height: "fit-content" }}
              >
                Counters
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="admin-franchises" id="admin">
        <div className="admin-cards">
          <div className="admin-card-flex">
            <div
              className="dashed-card card"
              onClick={() => setAddDialog(true)}
            >
              <div className="card-img">Franchise Image</div>
              <div className="card-content">
                <div className="card-title">Franchise Name</div>
                <div className="card-description">
                  <i>Franchise Description</i>
                </div>
              </div>
            </div>
            {data.length !== 0
              ? data.map((index) => {
                  return (
                    <div
                      className="card"
                      onClick={() => navigateToEditMenu(index.franchiseName)}
                    >
                      <div
                        className="card-img"
                        style={{ backgroundImage: `url(${index.imageUrl})` }}
                      ></div>
                      <div className="card-content">
                        <div className="card-title">{index.franchiseName}</div>
                        <div className="card-description">
                          <i>{index.franchiseDesc}</i>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
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
              id="FranchiseName"
              label="Franchise Name"
              variant="outlined"
              onKeyDown={handleNameKeyDown}
              value={franchiseName}
              onChange={(e) => setFranchiseName(e.target.value)}
            />
            <TextField
              fullWidth
              id="FranchiseDesc"
              label="Franchise Description"
              variant="outlined"
              onKeyDown={handleDescKeyDown}
              value={franchiseDesc}
              onChange={(e) => setFranchiseDesc(e.target.value)}
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
  );
}

export default AdminPage;
