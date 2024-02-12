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
import { loadMenu, setRecommended } from "./Actions/MenuActions";
import toast, { Toaster } from "react-hot-toast";
import SampleData from "./components/sampleData";

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
    props.loadMenu(SampleData);
    const recData = [];
    SampleData.map((category) => {
      category.items.map((item) => {
        if (item.isRecommended) recData.push(item);
      });
    });
    props.setRecommended(recData);
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
        <Route path="/admin/:id/category" element={<Category />} />
        <Route
          path="/admin/:franchise/category/:id/items"
          element={<Items />}
        />
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
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  loadMenu,
  setCart,
  setRecommended,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
