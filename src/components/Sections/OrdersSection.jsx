import React, { useState, useEffect } from "react";
import axios from "axios";
import { orders } from "../../routes/api";
import { useDispatch } from "react-redux";
import { OrderDetailsActions } from "../../redux/slice/orders-details";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import Pagination from "react-bootstrap/Pagination";
import OrderDetailsModal from "../Modal/OrderDetailsModal";

import { Funnel, SortDown, Search } from "react-bootstrap-icons";

import pizza from "../../assets/pizza.jpeg";

const OrdersSection = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [id, setID] = useState(0);

    // const fetchOrdersData = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.get(orders?.orders, {
    //             withCredentials: true,
    //         });
    //         setData(response?.data?.psdata);
    //         console.log(response);
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     setLoading(false);
    // };

    // const storeOrderId = (id) => {
    //     setID(id);
    //     dispatch(OrderDetailsActions.setOrderIdHandler(id));
    //     dispatch(OrderDetailsActions.toggleOrderDetailsDialog());
    // };

    // useEffect(() => {
    //     fetchOrdersData();
    // }, []);

    return (
        <>
            <OrderDetailsModal />
            <div className="bg-light p-4 br20px">
                <div className="d-flex">
                    <div className="d-flex col-lg-9 mx-3">
                        <p className="h5">سفارشات</p>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="row">
                        <div className={`${!data?.orders && "d-none"}`}>
                            <div className="col-lg-6 position-relative">
                                <Form>
                                    <Form.Control
                                        type="text"
                                        placeholder="جستجوی شماره سفارش یا نام مشتری"
                                        className="p-3"
                                        style={{ borderRadius: "50px" }}
                                    />
                                    <div
                                        className="position-absolute start-0 mx-2"
                                        style={{ top: "10px" }}
                                    >
                                        <Button variant="">
                                            <Search className="" size="25" />
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                            <div className="col-lg-6 row">
                                <div className="col-lg-6">
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant=""
                                            id="dropdown-filter"
                                            className="border p-3 w-100"
                                            style={{ borderRadius: "50px" }}
                                        >
                                            <Funnel size="25" />
                                            فیلتر کردن
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">
                                                ۱
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">
                                                ۲
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">
                                                ۳
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">
                                                ۴
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">
                                                ۵
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="col-lg-6">
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="light"
                                            id="dropdown-filter"
                                            className="border p-3 w-100"
                                            style={{ borderRadius: "50px" }}
                                        >
                                            <SortDown size="25" />
                                            مرتب کردن
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">
                                                ۱
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">
                                                ۲
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">
                                                ۳
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">
                                                ۴
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">
                                                ۵
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            {!data.orders && (
                                <div className="d-flex justify-content-center alignitems-center text-center">
                                    <p className="h6">
                                        درحال حاضر سفارشی وجود ندارد
                                    </p>
                                </div>
                            )}
                            <Table
                                bordered
                                hover
                                className={`${!data?.orders && "d-none"}`}
                                responsive
                            >
                                <thead>
                                    <tr>
                                        <th>سفارش</th>
                                        <th>مجموع</th>
                                        <th>وضعیت</th>
                                        <th>بارکد پستی</th>
                                        <th>تاریخ افزودن</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.orders !== false
                                        ? data?.orders?.map((order, index) => (
                                              <tr
                                                  className="text-center"
                                                  key={index}
                                              >
                                                  <td>{order?.reference}</td>
                                                  <td>
                                                      {
                                                          order?.total_paid_tax_excl
                                                      }
                                                  </td>
                                                  {/* <td>{order.osname}</td> */}
                                                  <td>
                                                      <Badge pill bg="info">
                                                          <p className="h6">
                                                              {order?.osname}
                                                          </p>
                                                      </Badge>
                                                  </td>
                                                  <td>{order?.barcode}</td>
                                                  <td>{order?.date_add}</td>
                                                  <td>
                                                      <button
                                                          className="btn"
                                                        //   onClick={() =>
                                                        //       storeOrderId(
                                                        //           order?.id_order
                                                        //       )
                                                        //   }
                                                      >
                                                          <Search size="25" />
                                                      </button>
                                                  </td>
                                              </tr>
                                          ))
                                        : ""}
                                </tbody>
                            </Table>
                            <div
                                className={`d-flex justify-content-center ${
                                    !data.orders && "d-none"
                                }`}
                            >
                                <Pagination>
                                    <Pagination.Prev />
                                    <Pagination.Item active>
                                        {1}
                                    </Pagination.Item>
                                    <Pagination.Next />
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrdersSection;
