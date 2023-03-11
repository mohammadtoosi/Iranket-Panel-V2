import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { account } from "./routes/api";
import auth from "./routes/auth";

import SignIn from "./pages/Authentication/SignIn";
import SellerForm from "./pages/Authentication/SellerForm";
import Dashboard from "./pages/panel/Dashboard";
import Products from "./pages/panel/Products";
import AddProduct from "./pages/panel/AddProduct";
import Orders from "./pages/panel/Orders";
import Settings from "./pages/panel/Settings";
import PaymentInfo from "./pages/panel/PaymentInfo";
import Shipping from "./pages/panel/Shipping";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

const App = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const loggedIn = localStorage.getItem("is_a");

    const logoutClickHandler = async () => {
        try {
            const response = await axios.get(auth.logout, {
                withCredentials: true,
            });
            navigate("/");
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    

    return (
        <>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route
                    path="/dashboard"
                    element={
                        // <PrivateRoute>
                            <Dashboard />
                        // </PrivateRoute>
                    }
                />
                <Route path="/dashboard/products" element={<Products />} />
                <Route path="/dashboard/add-product" element={<AddProduct />} />
                <Route path="/dashboard/orders" element={<Orders />} />
                <Route path="/dashboard/settings" element={<Settings />} />
                <Route path="/dashboard/financials" element={<PaymentInfo />} />
                <Route path="/dashboard/shipping" element={<Shipping />} />
            </Routes>
        </>
    );
};

export default App;
