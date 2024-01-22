import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null); // Local state for login process
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      console.log(confirmation);
      setUser(confirmation);
    } catch (err) {
      console.log(err);
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await user.confirm(otp);
      console.log(data);
      const intendedRoute = localStorage.getItem("intendedRoute");
      localStorage.removeItem("intendedRoute");
      navigate(intendedRoute || "/"); // Redirect to saved route or home
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      Hello
      <PhoneInput
        country={"in"}
        value={phone}
        onChange={(phone) => setPhone("+" + phone)}
      />
      <button onClick={sendOtp}>Send otp</button>
      <div id="recaptcha"></div>
      <input type="text" onChange={(e) => setOtp(e.target.value)} />
      <button onClick={verifyOtp}>Submit otp</button>
    </div>
  );
};

export default Login;
