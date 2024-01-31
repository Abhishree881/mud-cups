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
import OTPInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null); // Local state for login process
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
        callback: (response) => {
          // sendOtp();
        },
        "expired-callback": () => {},
      });
    }
  }

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
      // setShowInput(false);
      setLoading(true);
      onCaptchaVerify();
      const formattedPhone = "+91 " + phone;
      const recaptcha = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptcha
      );
      console.log(confirmation);
      setLoading(false);
      toast.success("OTP sent successfully");
      setUser(confirmation);
      setShowInput(false);
      setShowSubmit(true);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "An error occurred while sending OTP.",
      });
      console.log(err);
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    const displayName = name;
    try {
      const res = await user.confirm(otp);
      await updateProfile(res.user, {
        displayName,
      });
      const intendedRoute = localStorage.getItem("intendedRoute");
      localStorage.removeItem("intendedRoute");
      navigate(intendedRoute || "/");
      setLoading(false);
      const usersCollectionRef = collection(db, "users");
      await setDoc(doc(usersCollectionRef, res.user.uid), {
        uid: res.user.uid,
        displayName,
        currentCart: [{}],
      });
      // Redirect to saved route or home
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "The OTP you have entered is invalid",
      });
      console.log(err);
    }
  };

  const handleNameKeyDown = (event) => {
    if (event.key === "Enter") {
      document.getElementById("phoneInput").focus();
    }
  };

  const handlePhoneKeyDown = (event) => {
    if (event.key === "Enter") {
      sendOtp();
    }
  };

  return (
    <div className="login">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha" className="recaptcha"></div>
      <div className="blurred-box">
        <img className="logo" src={logo} alt="logo" />
        {showInput && (
          <div className="user-input">
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(name) => setName(name.target.value)}
              onKeyDown={handleNameKeyDown}
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
              id="phoneInput"
              placeholder="Enter your number"
              onChange={(phone) => setPhone(phone.target.value)}
              onKeyDown={handlePhoneKeyDown}
            />
            <button className="send-otp" onClick={sendOtp}>
              {loading ? (
                <CgSpinner size={20} className="mt- 1 animate-spin" />
              ) : (
                "Send otp"
              )}
            </button>
          </div>
        )}
        {showSubmit && (
          <div className="user-input">
            {/* <input
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            /> */}
            <OTPInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="otp-login"
            />
            <button className="send-otp" onClick={verifyOtp}>
              {loading ? (
                <CgSpinner size={20} className="mt- 1 animate-spin" />
              ) : (
                "Verify otp"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
