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
            checked={data.isAvailable}
          />
        </span>
        <div
          style={{
            backgroundImage: `url(${data.imageUrl})`,
            width: "45px",
            aspectRatio: "1/1",
            backgroundColor: "white",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "10px",
            marginLeft: "10px",
          }}
        ></div>
        <div className="itemcard-item">
          <span className="itemcard-name">{data.itemName}</span>
          <span className="itemcard-desc">{data.itemDesc}</span>
        </div>
      </div>
      <span className="itemcard-price">&#x20B9;{data.itemPrice}</span>
    </div>
  );
}

export default ItemCard;
