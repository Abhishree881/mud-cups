import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { IoClose } from "react-icons/io5";
import "../assets/styles/dialog.css";

const DialogBox = ({ isOpen, children, setClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function updateIsMobile() {
      setIsMobile(window.innerWidth <= 600);
    }
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);

  return (
    <Dialog
      open={isOpen}
      scroll={"body"}
      fullWidth={true}
      maxWidth={"sm"}
      fullScreen={isMobile}
    >
      <div className="add-dialog">
        <div className="close-icon" onClick={() => setClose(false)}>
          <IoClose style={{ fontSize: "18px", fontWeight: "bold" }} />
        </div>
        <div className="dialog-content">{children}</div>
      </div>
    </Dialog>
  );
};

export default DialogBox;
