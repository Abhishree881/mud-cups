import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home";
import AdminPage from "./pages/Admin";
import OrderPage from "./pages/OrderPage";
import Category from "./pages/Category";
import Counter from "./pages/Counter";
import NotFoundPage from "./pages/NotFound";
import Items from "./pages/Items";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import { AuthContext } from "./AuthContext";
import { connect } from "react-redux";
import { setCart } from "./Actions/CartActions";
import { fetchCartDb } from "./Actions/CartDabase";
import AddCategory from "./pages/AddCategory";
import { loadMenu } from "./Actions/MenuActions";
import toast, { Toaster } from "react-hot-toast";

function App(props) {
  const { currentUser } = useContext(AuthContext);
  const [currentTable, setCurrentTable] = useState();
  const isValidCounterId = (value) => {
    return value === "1" || value === "2";
  };
  useEffect(() => {
    const updateCart = async () => {
      if (currentUser?.uid) {
        if (currentTable) {
          toast.success(`Welcome ${currentUser?.displayName}`, { icon: "👋" });
        }
        const userDoc = await fetchCartDb(currentUser);
        props.setCart(userDoc.filter((obj) => Object.keys(obj).length !== 0));
      }
    };
    updateCart();
  }, [currentUser]);

  useEffect(() => {
    const tempMenu = [
      {
        index: 1,
        name: "North Indian",
        len: 12,
        imgUrl:
          "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png",
      },
      {
        index: 2,
        name: "Punjabi",
        len: 1,
        imgUrl:
          "https://silkroadrecipes.com/wp-content/uploads/2021/12/Paneer-Butter-Masala-square.jpg",
      },
      {
        index: 3,
        name: "American",
        len: 25,
        imgUrl:
          "https://img.freepik.com/premium-photo/hamburger-with-toothpick-it-small-toothpick-top_442337-492.jpg",
      },
      {
        index: 4,
        name: "South Indian",
        len: 30,
        imgUrl:
          "https://img-mm.manoramaonline.com/content/dam/mm/mo/pachakam/readers-recipe/images/2023/10/27/Square--ragi-dosa.jpg",
      },
    ];
    props.loadMenu(tempMenu);
  }, []);
  const CounterRoute = () => {
    const { id } = useParams();
    if (isValidCounterId(id)) {
      return <Counter />;
    } else {
      return <Navigate to="/404" />;
    }
  };

  const PrivateRoute = ({ children }) => {
    if (!currentUser) {
      const path = window.location.pathname;
      setCurrentTable(path);
      localStorage.setItem("intendedRoute", path);
      return <Navigate to="/login" />;
    }
    return children;
  };

  const PrivateLoginRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to={currentTable ? currentTable : "/"} />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Toaster toastOptions={{ duration: 4000 }} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateLoginRoute>
              <Login />
            </PrivateLoginRoute>
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/items/:id" element={<Items />} />
        <Route path="/counter/:id" element={<CounterRoute />} />
        <Route path="/:id/search" element={<Search />} />
        <Route
          path="/:id"
          element={
            <PrivateRoute>
              <OrderPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/:id/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route path="/admin/edit" element={<AddCategory />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  loadMenu,
  setCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
