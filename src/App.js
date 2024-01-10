import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useParams, } from "react-router-dom";
import Home from "./pages/Home";
import AdminPage from "./pages/Admin";
import OrderPage from "./pages/OrderPage";
import Category from "./pages/Category";
import Counter from "./pages/Counter";
import NotFoundPage from "./pages/NotFound";
import Items from "./pages/Items";

function App() {
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

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/items/:id" element={<Items />} />
        <Route path="/counter/:id" element={<CounterRoute />} />
        <Route path="/:id" element={<OrderPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
