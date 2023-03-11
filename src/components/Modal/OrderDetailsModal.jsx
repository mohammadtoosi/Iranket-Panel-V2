import React, { useEffect, useState } from "react";
import axios from "axios";
import { orders } from "../../routes/api";
import { useSelector, useDispatch } from "react-redux";
import { OrderDetailsActions } from "../../redux/slice/orders-details";

import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CategoryModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ordersDetails.isOpen);
    const orderId = useSelector((state) => state.ordersDetails.orderId);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [order, setOrder] = useState({});
    const [orderStateId, setOrderStateId] = useState("");
    const [barcode, setBarcode] = useState("");

    const fetchOrderData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(orders.order + orderId, {
                withCredentials: true,
            });
            setOrder(response?.data?.psdata?.order);
            setData(response?.data?.psdata);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const orderStateIdChangeHandler = (event) => {
        setOrderStateId(event.target.value);
    };

    const barcodeChangeHandler = (event) => {
        setBarcode(event.target.value);
    };

    const closeModalClickHandler = () => {
        dispatch(OrderDetailsActions.toggleOrderDetailsDialog());
    };

    const updateShippingStatusClickHandler = async () => {
        setLoading(true);
        const bodyWithBarcode = {
            method: "POST",
            body: JSON.stringify({
                submitState: true,
                id_order: orderId,
                id_order_state: 4,
                barcode: barcode,
            }),
            credentials: "include",
        };
        const bodyWithoutBarcode = {
            method: "POST",
            body: JSON.stringify({
                submitState: true,
                id_order: orderId,
                id_order_state: orderStateId,
            }),
            credentials: "include",
        };
        const requestOptions =
            orderStateId === "4" ? bodyWithBarcode : bodyWithoutBarcode;
        try {
            const response = await fetch(orders.sellerOrder, requestOptions);
            const data = await response.json();
            console.log(response);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrderData();
    }, [orderId]);

    useEffect(() => {
        console.log(orderStateId);
    }, [orderStateId]);

    return (
        <Modal show={isOpen} onHide={closeModalClickHandler}>
            <Modal.Header onClick={closeModalClickHandler}>
                <Modal.Title>سفارش</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading && (
                    <div className="d-flex justify-content-center align-items-center">
                        <Spinner animation="border" variant="info" />
                    </div>
                )}
                <div className="p-3" style={{ backgroundColor: "white" }}>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>وضعیت پرداخت</th>
                                <th>تاریخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.order_shipping?.map((ship, i) => (
                                <tr>
                                    <td>{ship?.order_state_name}</td>
                                    <td>{ship?.date_add}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="p-3" style={{ backgroundColor: "white" }}>
                    <p>تغییر وضعیت سفارش</p>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>وضعیت سفارش</th>
                                {orderStateId === "4" && <th>بارکد</th>}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Form.Select
                                        value={orderStateId}
                                        onChange={orderStateIdChangeHandler}
                                    >
                                        <option>انتخاب وضعیت سفارش</option>
                                        <option
                                            value={
                                                data?.order_states?.["7"]
                                                    ?.id_order_state
                                            }
                                        >
                                            درحال اماده سازی
                                        </option>
                                        <option
                                            value={
                                                data?.order_states?.["1"]
                                                    ?.id_order_state
                                            }
                                        >
                                            ارسال شد
                                        </option>
                                        <option
                                            value={
                                                data?.order_states?.["8"]
                                                    ?.id_order_state
                                            }
                                        >
                                            لغو شده
                                        </option>
                                    </Form.Select>
                                </td>
                                {orderStateId === "4" ? (
                                    <>
                                        <td>
                                            <Form.Control
                                                value={barcode}
                                                onChange={barcodeChangeHandler}
                                            />
                                        </td>
                                    </>
                                ) : (
                                    ""
                                )}
                                <td className="text-center">
                                    <Button
                                        variant="success"
                                        onClick={
                                            updateShippingStatusClickHandler
                                        }
                                    >
                                        {loading && (
                                            <Spinner
                                                className="mx-2"
                                                size="sm"
                                                animation="border"
                                                variant="light"
                                            />
                                        )}
                                        بروزرسانی
                                    </Button>
                                </td>
                            </tr>
                            ‌
                        </tbody>
                    </Table>
                </div>
                <div className="p-3" style={{ backgroundColor: "white" }}>
                    <p className="iran-bold h-3">سفارش</p>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>تاریخ</th>
                                <th>مجموع</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{order?.date_add}</td>
                                <td>{order?.total_paid}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="p-3">
                    <p className="iran-bold">مشتری</p>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>مشتری</th>
                                <th>شهر</th>
                                <th>ادرس</th>
                                <th>کد پستی</th>
                                <th>موبایل</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data?.customer_name}</td>
                                <td>{data?.address_delivery?.city}</td>
                                <td>{data?.address_delivery?.address1}</td>
                                <td>{data?.address_delivery?.postcode}</td>
                                <td>{data?.address_delivery?.phone}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="p-3">
                    <p className="iran-bold">محصولات</p>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>محصول</th>
                                <th>موجودی</th>
                                <th>کمسیون</th>
                                <th>مجموع</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.products?.map((product, i) => (
                                <tr>
                                    <td>{product?.product_name}</td>
                                    <td>{product?.product_quantity}</td>
                                    <td>
                                        {product?.total_commission_tax_incl}
                                    </td>
                                    <td>
                                        {product?.total_commission_tax_incl}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-danger"
                    onClick={closeModalClickHandler}
                >
                    بستن
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default CategoryModal;
