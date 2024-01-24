import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../assets/styles/login.css";
import logo from "../assets/image/logo.jpeg";
import Swal from "sweetalert2";
import { collection, doc, setDoc } from "firebase/firestore";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null); // Local state for login process
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Phone Number",
          text: "Please enter a valid 10-digit phone number.",
        });
        return;
      }
      if (name.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Name is mandatory",
          text: "Please enter your name",
        });
        return;
      }
      setShowInput(false);
      const formattedPhone = "+91 " + phone;
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptcha
      );
      console.log(confirmation);
      setUser(confirmation);
      setShowSubmit(true);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "An error occurred while sending OTP.",
      });
      console.log(err);
    }
  };

  const verifyOtp = async () => {
    const displayName = name;
    try {
      const res = await user.confirm(otp);
      await updateProfile(res.user, {
        displayName,
      });
      const usersCollectionRef = collection(db, "users");
      await setDoc(doc(usersCollectionRef, res.user.uid), {
        uid: res.user.uid,
        displayName,
        currentCart: {}
      });
      const intendedRoute = localStorage.getItem("intendedRoute");
      localStorage.removeItem("intendedRoute");
      navigate(intendedRoute || "/"); // Redirect to saved route or home
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "The OTP you have entered is invalid",
      });
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="blurred-box">
        <img className="logo" src={logo} alt="logo" />
        {showInput && (
          <div className="user-input">
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(name) => setName(name.target.value)}
            />
            <div className="phone-container">
              {/* <PhoneInput
            country={"in"}
            value={phone}
            onChange={(phone) => setPhone("+" + phone)}
            className="phone-input"
          /> */}
            </div>
            <input
              type="text"
              placeholder="Enter your number"
              onChange={(phone) => setPhone(phone.target.value)}
            />
            <button className="send-otp" onClick={sendOtp}>
              Send otp
            </button>
          </div>
        )}
        {!showSubmit && <div id="recaptcha" className="recaptcha"></div>}
        {showSubmit && (
          <div className="user-input">
            <input
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="send-otp" onClick={verifyOtp}>
              Submit otp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
