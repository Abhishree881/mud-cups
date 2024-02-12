import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function Counter() {
  let { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const unsub = onSnapshot(doc(db, `${id} Orders`, "orders"), (doc) => {
      console.log("Current data: ", doc.data().items);
      setData(doc.data().items);
    });
    return () => {
      unsub();
    };
  }, [id]);
  return (
    <div>
      <div className="font-bold text-2xl">Counter : {id}</div>
      {data &&
        data.map((item, index) => {
          return (
            <div>
              <span>
                {"Order number: "}
                {index + 1}
              </span>
              <span> {item.itemName}</span>
            </div>
          );
        })}
    </div>
  );
}

export default Counter;
