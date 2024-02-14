import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function Counter() {
  let { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const unsub = onSnapshot(doc(db, `${id} Orders`, "orders"), (doc) => {
      console.log("Current data: ", doc.data()?.items);
      setData(doc.data()?.items);
    });
    return () => {
      unsub();
    };
  }, [id]);
  return (
    <div style={{ width: "98%", margin: "auto", padding: "10px" }}>
      <div className="font-bold text-2xl">Counter : {id}</div>
      {data &&
        data.map((item, index) => {
          return (
            <div
              style={{
                border: "1px dashed rgb(0,0,0,0.5)",
                width: "99%",
                margin: "auto",
                padding: "10px",
                margin: "10px 0",
              }}
            >
              <span>
                {"Order number: "}
                {index + 1}
              </span>
              <span>
                {" and item is "}
                {item.count}
                {" * "}
                {item.itemName}
              </span>
              <span>
                {" "}
                {"on table: "}
                {item.tableNumber}
              </span>
            </div>
          );
        })}
    </div>
  );
}

export default Counter;
