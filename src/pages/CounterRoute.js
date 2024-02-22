import { useNavigate } from "react-router-dom";
import "../assets/styles/admin.css";

const CounterRoute = () => {
  const navigate = useNavigate();
  const data = [
    {
      id: 1,
      counter: "Counter 1",
    },
    {
      id: 2,
      counter: "Counter 2",
    },
  ];

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
                      key={index.id}
                      className="card"
                      onClick={() => navigateToOrders(index.counter)}
                    >
                      <div className="card-content">
                        <div className="card-title">{index.counter}</div>
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
