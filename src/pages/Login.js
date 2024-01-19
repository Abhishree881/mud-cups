import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");

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
