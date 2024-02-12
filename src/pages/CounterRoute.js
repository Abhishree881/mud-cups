import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/admin.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const CounterRoute = () => {
  const navigate = useNavigate();
  const [firstLoad, setFirstLoad] = useState(true);
  const [data, setData] = useState([]);

  const handleFetch = async () => {
    let array = [];
    const collectionRef = await getDocs(collection(db, "franchices"));
    collectionRef.forEach((doc) => {
      array.push(doc.data());
    });
    setData(array);
  };

  useEffect(() => {
    setFirstLoad(false);
    if (firstLoad) {
      handleFetch();
    }
  }, [firstLoad]);

  const navigateToOrders = (id) => {
    navigate(`./${id}`);
  };

  return (
    <div className="admin-page">
      <div className="admin-franchises" id="admin">
        <div className="admin-cards">
          <div className="admin-card-flex">
            {data.length !== 0
              ? data.map((index) => {
                  return (
                    <div
                      className="card"
                      onClick={() => navigateToOrders(index.franchiseName)}
                    >
                      <div
                        className="card-img"
                        style={{ backgroundImage: `url(${index.imageUrl})` }}
                      ></div>
                      <div className="card-content">
                        <div className="card-title">{index.franchiseName}</div>
                        <div className="card-description">
                          <i>{index.franchiseDesc}</i>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterRoute;
