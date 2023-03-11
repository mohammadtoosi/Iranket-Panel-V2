import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { dashboard, product } from "../../routes/api";

import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";

import {
    PersonFill,
    ColumnsGap,
    Tag,
    CartCheck,
    Truck,
    Wallet,
    Shop,
} from "react-bootstrap-icons";

import classes from "./Menu.module.css";

const Menu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sLoading, setSLoading] = useState(false);

    const detailsHandler = async () => {
        setLoading(true);
        try {
            const response = await axios.get(dashboard, {
                withCredentials: true,
            });
            setData(response.data.psdata);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        detailsHandler();
    }, []);

    const AddProductClickHandler = async () => {
        setSLoading(true);
        const options = {
            method: "POST",
            body: JSON.stringify({ action: "add_empty" }),
            credentials: "include",
        };
        try {
            const response = await fetch(product.index, options);
            const data = await response.json();
            console.log(data);
            if (response.ok || response.status === 200) {
                localStorage.setItem("pd", data?.psdata?.id_product);
                setTimeout(() => {
                    navigate("/dashboard/add-product");
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        }
        setSLoading(false);
    };

    return (
        <>
            <div>
                <div className={`bg-white ${classes.br20px}`}>
                    <div
                        className={`d-flex justify-content-center align-items-center ${classes.br20px} ${classes["gray-sec"]}`}
                    >
                        <div>
                            {loading && (
                                <Spinner animation="border" variant="info" />
                            )}
                        </div>
                        <p className="h4">{data?.seller?.shop}</p>
                    </div>
                    <div className={`position-relative`}>
                        <div className={`d-block ${classes["-mt45px"]} mx-3`}>
                            <div
                                className={`d-flex justify-content-center align-items-center ${classes.avatar}`}
                            >
                                <PersonFill color="#FFFFFF" size="40" />
                            </div>
                            <div className="d-flex flex-column position-absolute top-0 end-0 mt-2" style={{marginRight: "100px"}}>
                                <div className="text-white">
                                    <p className="h6">{data?.seller?.shop}</p>
                                </div>
                                <div className="text-black mt-1 mx-2">
                                    <p className="h6">{data?.seller?.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <ListGroup defaultActiveKey="#/">
                            <ListGroup.Item
                                action
                                href="/dashboard"
                                className="d-flex h5 border-0"
                            >
                                <span className="mx-3">
                                    <ColumnsGap />
                                </span>
                                <p className="mx-2">پیشخوان</p>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                className="d-flex h5 border-0"
                                onClick={AddProductClickHandler}
                            >
                                <span className="mx-3">
                                    <Tag />
                                </span>
                                <p className={`mx-2`}>افزودن محصول</p>
                                {sLoading && (
                                    <Spinner
                                        animation="border"
                                        variant="info"
                                        size="sm"
                                    />
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                href="/dashboard/products"
                                className="d-flex h5 border-0"
                            >
                                <span className="mx-3">
                                    <Tag />
                                </span>
                                <p className="mx-2">محصولات</p>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                href="/dashboard/orders"
                                className="d-flex h5 border-0"
                            >
                                <span className="mx-3">
                                    <CartCheck />
                                </span>
                                <p className="mx-2">سفارشات</p>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                href="/dashboard/shipping"
                                className="d-flex h5 border-0"
                            >
                                <span className="mx-3">
                                    <Truck />
                                </span>
                                <p className="mx-2">روش و هزینه ارسال</p>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                href="/dashboard/financials"
                                className="d-flex h5 border-0"
                            >
                                <span className="mx-3">
                                    <Wallet />
                                </span>
                                <p className="mx-2">امور مالی</p>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                href="/dashboard/settings"
                                className="d-flex h5 border-0"
                            >
                                <hr />
                                <span className="mx-3">
                                    <Shop />
                                </span>
                                <p className="mx-2">تنظیمات</p>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;
