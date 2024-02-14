import React, { useState } from "react";
import "../assets/styles/admin.css";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";

const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState(null);
  const [adminPassword, setAdminPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (adminEmail === null) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter an Email",
      });
      return;
    }
    if (adminPassword === null) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Please enter a Password",
      });
      return;
    }
    setLoading(true);
    await signInWithEmailAndPassword(auth, adminEmail, adminPassword).then(
      (user) => {
        console.log(user);
      }
    );
    const intendedRoute = localStorage.getItem("intendedRoute");
    localStorage.removeItem("intendedRoute");
    navigate(intendedRoute || "/");
    setLoading(false);
  };

  const handleEmailKeyDown = (event) => {
    if (event.key === "Enter") {
      document.getElementById("AdminPassword").focus();
    }
  };

  const handlePasswordKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-dashboard">
        <div className="admin-welcome">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              //   justifyContent: "center",
              backgroundColor: "rgb(255,255,255,0.9)",
              color: "black",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            <h3 style={{ marginTop: "30px" }}>Sign In</h3>
            <div style={{ width: "80%", marginTop: "40px" }}>
              <TextField
                fullWidth
                id="AdminEmail"
                label="Admin Email"
                variant="outlined"
                onKeyDown={handleEmailKeyDown}
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              <TextField
                fullWidth
                id="AdminPassword"
                label="Admin Password"
                variant="outlined"
                onKeyDown={handlePasswordKeyDown}
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                style={{ marginTop: "10px" }}
              />
            </div>
            <button onClick={handleSubmit}>
              {loading ? (
                <CgSpinner size={20} className="mt- 1 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
