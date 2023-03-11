import React, { useState, useEffect } from "react";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import { useSelector, useDispatch } from "react-redux";
import { ProductEditActions } from "../../redux/slice/product-edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { product } from "../../routes/api";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "@mui/material/Pagination";
import EditProductModal from "../Modal/EditProudtcModal";
import Delayed from "../Delay";

import {
    Plus,
    Funnel,
    SortDown,
    Search,
    ThreeDotsVertical,
    PencilSquare,
} from "react-bootstrap-icons";

import pizza from "../../assets/pizza.jpeg";

const ProductsSection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [dataPerPage, setDataPerPage] = useState([]);
    const [editId, setEditId] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(product.productPages + "1", {
                withCredentials: true,
            });
            setData(response.data.psdata);
            console.log(response.data.psdata);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const fetchProductsPage = async () => {
        setLoading(true);
        try {
            const response = await axios.get(product.productPages + page, {
                withCredentials: true,
            });
            setDataPerPage(response.data.psdata);
            console.log(response.data.psdata);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const pageChangeHandler = (e) => {
        setPage(e.target.innerText);
        console.log(page);
    };

    const openProductEditClickHandler = (id, images) => {
        setEditId(id);
        dispatch(ProductEditActions.setEditId(id));
        dispatch(ProductEditActions.setImages(images));
        dispatch(ProductEditActions.toggleProductEditDialog());
    };

    const firstTimeData = data?.products?.map((p, i) => (
        <tr key={i}>
            <td>
                <img src={p?.default_image?.small?.url} />
            </td>
            <td>
                <p className="bold">{p.name}</p>
                {/* <div className="d-flex">
                        <p className="">
                            شناسه کاربری: ۶۸۸۶۳۹
                        </p>
                        <a
                            className="mx-2"
                            href="#statistics"
                        >
                            مشاهده امار
                        </a>
                    </div> */}
            </td>
            <td>{p.price}</td>
            <td>{p.quantity}</td>
            <td>
                <Badge
                    pill
                    bg={p.availability === "unavailable" ? "danger" : "success"}
                >
                    <p className="h6">
                        {p.availability === "unavailable" ? "ناموجود" : "موجود"}
                    </p>
                </Badge>
            </td>
            <td>
                <button
                    className="btn"
                    onClick={() =>
                        openProductEditClickHandler(p?.id_product, p?.images)
                    }
                >
                    <PencilSquare size="25" />
                </button>
            </td>
        </tr>
    ));

    const dataFromPages = dataPerPage?.products?.map((p, i) => (
        <tr key={i}>
            <td>
                <img src={p?.default_image?.small?.url} />
            </td>
            <td>
                <p className="bold">{p.name}</p>
                {/* <div className="d-flex">
                        <p className="">
                            شناسه کاربری: ۶۸۸۶۳۹
                        </p>
                        <a
                            className="mx-2"
                            href="#statistics"
                        >
                            مشاهده امار
                        </a>
                    </div> */}
            </td>
            <td>{p.price}</td>
            <td>{p.quantity}</td>
            <td>
                <Badge
                    pill
                    bg={p.availability === "unavailable" ? "danger" : "success"}
                >
                    <p className="h6">
                        {p.availability === "unavailable" ? "ناموجود" : "موجود"}
                    </p>
                </Badge>
            </td>
            <td>
                <button
                    className="btn"
                    onClick={() =>
                        openProductEditClickHandler(p?.id_product, p?.images)
                    }
                >
                    <PencilSquare size="25" />
                </button>
            </td>
        </tr>
    ));

    useEffectOnce(() => {
        fetchProducts();
    });

    useEffect(() => {
        setDataPerPage([]);
        fetchProductsPage();
    }, [page]);

    return (
        <>
            <EditProductModal />
            <div className="bg-light p-4 br20px">
                <div className="d-flex">
                    <div className="d-flex col-lg-9 mx-3">
                        <p className="h5">امار بازدید و فروش</p>
                    </div>
                    <div className="h4 mx-3">
                        <Button
                            variant="primary"
                            onClick={() => {
                                navigate("/dashboard/add-product");
                            }}
                        >
                            <Plus size="25" />
                            افزودن محصول
                        </Button>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="row">
                        <div className="col-lg-6 position-relative">
                            <Form>
                                <Form.Control
                                    type="text"
                                    placeholder="جست و جو در محصولات"
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
                        <div className="mt-4">
                            <Table hover responsive>
                                <thead>
                                    <tr>
                                        <th>تصویر</th>
                                        <th>نام محصول</th>
                                        <th>قیمت</th>
                                        <th>موجودی</th>
                                        <th>وضعیت</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading && (
                                        <Spinner
                                            animation="border"
                                            variant="info"
                                        />
                                    )}
                                    {page === 1 && firstTimeData}
                                    {page !== 1 && dataFromPages}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-center">
                                {loading && (
                                    <Spinner
                                        animation="border"
                                        variant="info"
                                    />
                                )}
                                <Pagination
                                    onChange={pageChangeHandler}
                                    count={data?.num_pages}
                                    shape="rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductsSection;
