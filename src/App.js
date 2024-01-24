import React, { useContext, useEffect } from "react";
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
import { AuthContext } from "./AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const isValidCounterId = (value) => {
    return value === "1" || value === "2";
  };

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
      localStorage.setItem("intendedRoute", path);
      return <Navigate to="/login" />;
    }
    return children;
  };

  const PrivateLoginRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
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
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
