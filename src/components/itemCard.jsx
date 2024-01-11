import React from "react";
import "../assets/styles/itemcard.css";

function ItemCard({ data }) {
  return (
    <div className="itemcard">
      <div className="itemcard-body">
        <span>
          <input
            className="checkbox"
            type="checkbox"
            id="myCheckbox"
            name="myCheckbox"
            value="checked"
          />
        </span>
        <div className="itemcard-item">
          <span className="itemcard-name">{data.name}</span>
          <span className="itemcard-desc">{data.category}</span>
        </div>
      </div>
      <span className="itemcard-price">&#x20B9; {data.price}</span>
    </div>
  );
}

export default ItemCard;
