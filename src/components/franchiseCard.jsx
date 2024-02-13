import React from "react";
import "../assets/styles/userhome.css";
import { Link } from "react-router-dom";

const FranchiseCard = ({ data }) => {
  return (
    <Link to={`./${data.franchiseName}`}>
      <div className="franchise-card">
        <div
          className="franchise-card-image"
          style={{ backgroundImage: `url(${data.imageUrl})` }}
        ></div>
        <div className="franchise-content">
          <div className="franchise-name">{data.franchiseName}</div>
          <div className="franchise-desc">{data.franchiseDesc}</div>
        </div>
      </div>
    </Link>
  );
};

export default FranchiseCard;
