import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { fetchFavourites } from "./Actions/MenuDatabase";
import { loadFav } from "./Actions/MenuActions";
import { loadMenu, setRecommended } from "./Actions/MenuActions";
import toast, { Toaster } from "react-hot-toast";
import CounterRoute from "./pages/CounterRoute";
import UserHome from "./pages/UserHome";
import "./assets/styles/loader.scss";
import AdminLogin from "./pages/AdminLogin";

function App(props) {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [currentTable, setCurrentTable] = useState();

  useEffect(() => {
    const updateCart = async () => {
      if (currentUser?.uid) {
        if (currentTable) {
          toast.success(`Welcome ${props.userName}`, { icon: "👋" });
        }
        const userDoc = await fetchCartDb(currentUser);
        props.setCart(userDoc.filter((obj) => Object.keys(obj).length !== 0));
        const fav = await fetchFavourites(currentUser)
        // console.log(fav)
        props.loadFav(fav)
      }
    };
    const isEmpty = (obj) => {
      return JSON.stringify(obj) === "{}";
    };
    updateCart();
    if (!isEmpty(currentUser)) {
      setLoading(false);
    }
  }, [currentUser]);

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

  const AdminLoginRoute = ({ children }) => {
    if (!currentUser?.auth?.currentUser?.email) {
      const path = window.location.pathname;
      localStorage.setItem("intendedRoute", path);
      return <Navigate to="/adminlogin" />;
    }
    return children;
  };

  if (loading) {
    return <div className="loader" />; // Display loading indicator until currentUser is fetched
  }

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
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminLoginRoute>
              <AdminPage />
            </AdminLoginRoute>
          }
        />
        <Route
          path="/admin/:id/category"
          element={
            <AdminLoginRoute>
              <Category />
            </AdminLoginRoute>
          }
        />
        <Route
          path="/admin/:franchise/category/:id/items"
          element={
            <AdminLoginRoute>
              <Items />
            </AdminLoginRoute>
          }
        />
        <Route
          path="/counter"
          element={
            <AdminLoginRoute>
              <CounterRoute />
            </AdminLoginRoute>
          }
        />
        <Route
          path="/counter/:id"
          element={
            <AdminLoginRoute>
              <Counter />
            </AdminLoginRoute>
          }
        />
        <Route path="/:id/search" element={<Search />} />
        <Route
          path="/:id"
          element={
            <PrivateRoute>
              <UserHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/:id/:franchise"
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
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => ({
  userName: state.cartReducer.userName,
});

const mapDispatchToProps = {
  loadMenu,
  setCart,
  setRecommended,
  loadFav
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
