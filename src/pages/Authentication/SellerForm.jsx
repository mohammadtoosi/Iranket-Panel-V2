import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ConfirmActions } from "../../redux/slice/confirm-mobile";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { seller, carrier } from "../../routes/api";
import iranketLogo from "../../assets/images/ket.jpg";
import { createContainer } from "@mui/system";

const initialSellerValues = {
    name: "",
    shopName: "",
    shopPhone: "",
    shopEmail: "",
    shopAddress: "",
    shopArea: "",
    shopCity: "",
};

const sellerReducer = (state, action) => {
    switch (action.type) {
        case "shop_name":
            return {
                ...state,
                shopName: action.value,
            };
        case "shop_phone":
            return {
                ...state,
                shopPhone: action.value,
            };
        case "shop_email":
            return {
                ...state,
                shopEmail: action.value,
            };
        case "shop_address":
            return {
                ...state,
                shopAddress: action.value,
            };
        case "shop_area":
            return {
                ...state,
                shopArea: action.value,
            };
        case "shop_city":
            return {
                ...state,
                shopCity: action.value,
            };
        default:
            break;
    }
};

const SellerForm = (props) => {
    const rDispatch = useDispatch();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(sellerReducer, initialSellerValues);
    const [isLoading, setIsLoading] = useState();
    const [checked, setChecked] = useState(false);
    const [carrierForm, setCarrierForm] = useState([]);
    const sellerForm = useSelector((state) => state.confirm.showSellerForm);

    const onInputChange = (type, value) => {
        dispatch({
            type: type,
            value: value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
    };

    const onSubmitForm = async () => {
        console.log("from seller form");
        const nInitialValue = {
            shopName: state.shopName,
            shopEmail: state.shopEmail,
            shopAddress: state.shopAddress,
            shopArea: state.shopArea,
            shopCity: state.shopCity,
        };
        console.log(nInitialValue);
        try {
            setIsLoading(true);
            const requestOptions = {
                method: "POST",
                body: JSON.stringify({
                    submitSeller: true,
                    action: "add",
                    name: "محمد طوسی",
                    shop: nInitialValue.shopName,
                    email: nInitialValue.shopEmail,
                    state: nInitialValue.shopArea,
                    city: nInitialValue.shopCity,
                    address: nInitialValue.shopAddress,
                    conditions: true,
                }),
                credentials: "include",
            };
            const response = await fetch(
                "https://app.iranket.com/rest/seller",
                requestOptions
            );
            const data = await response.json();
            console.log(data);
            console.log(response);
            if (data?.code === 200 || data?.success) {
                createCarrierAsync();
                sessionStorage.setItem("is_a", true);
            }
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    const createCarrierAsync = async () => {
        console.log("from seller from create carrier");
        console.log("Starting ...");
        const nInitialValue = {
            submitCarrier: true,
            action: "add",
            carrier_name: state.shopName,
            languages: [
                {
                    id_lang: "1",
                    name: "پارسی (Persian)",
                    active: "1",
                    iso_code: "fa",
                    language_code: "fa-ir",
                    locale: "fa-IR",
                    date_format_lite: "Y-m-d",
                    date_format_full: "Y-m-d H:i:s",
                    is_rtl: "1",
                    id_shop: "1",
                    shops: {
                        1: true,
                    },
                },
            ],
            zones: [
                {
                    id_zone: "3",
                    name: "Asia",
                    active: "1",
                },
            ],
            url: "",
            delay_1: "about 2 days",
            is_free: false,
            shipping_method: 1,
            zone_3: true,
            fees: {
                3: 0,
            },
            groupBox: [3],
            range_inf: [0],
            range_sup: [0],
            associate_products: true,
        };

        try {
            const requestOptions = {
                method: "POST",
                body: JSON.stringify(nInitialValue),
                credentials: "include",
            };
            const response = await fetch(carrier.carrier, requestOptions);
            const data = await response.json();
            if (data.code === 200 || data.success) {
                navigate("/dashboard");
            }
            console.log(data);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    const checkedChangeHandler = (event) => {
        setChecked(event.target.value);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center position-absolute start-0 end-0 top-0 bottom-0">
            <Row
                className={`col-lg-4 border rounded p-4`}
                style={{ backgroundColor: "white" }}
            >
                <div className="d-flex flex-column justify-content-center align-content-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <img
                            src={iranketLogo}
                            alt="iranket logo"
                            height="150"
                        />
                    </div>
                    <div className="d-flex justify-content-center align-items-center h5">
                        <p className="">ساخت حساب کاربری فروشنده</p>
                    </div>
                    <div className="">
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label>نام</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={props.name}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>نام فروشگاه</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={state.shopName}
                                    onChange={(event) => {
                                        onInputChange(
                                            "shop_name",
                                            event.target.value
                                        );
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>شماره تماس</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={state.shopPhone}
                                    onChange={(event) => {
                                        onInputChange(
                                            "shop_phone",
                                            event.target.value
                                        );
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>ایمیل</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={state.shopEmail}
                                    onChange={(event) => {
                                        onInputChange(
                                            "shop_email",
                                            event.target.value
                                        );
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>ادرس</Form.Label>
                                <Form.Control
                                    value={state.shopAddress}
                                    onChange={(event) => {
                                        onInputChange(
                                            "shop_address",
                                            event.target.value
                                        );
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>استان</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={state.shopArea}
                                    onChange={(event) => {
                                        onInputChange(
                                            "shop_area",
                                            event.target.value
                                        );
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>شهر</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={state.shopCity}
                                    onChange={(event) => {
                                        onInputChange(
                                            "shop_city",
                                            event.target.value
                                        );
                                    }}
                                    required
                                />
                            </Form.Group>
                            <div className="mt-4 d-flex">
                                <Form.Check
                                    onChange={checkedChangeHandler}
                                    checked={checked}
                                    type="checkbox"
                                />
                                <p className="mx-2">
                                    با قوانین ایرانکت موافق هستم.
                                </p>
                            </div>
                            <div className="col-lg-12 mt-3">
                                <Button
                                    variant="info w-100 text-white p-2"
                                    onClick={onSubmitForm}
                                    disabled={
                                        checked === false
                                            ? true
                                            : isLoading === true
                                            ? true
                                            : false
                                    }
                                >
                                    {isLoading === true ? (
                                        <Spinner
                                            className="mx-2"
                                            animation="border"
                                            size="sm"
                                        />
                                    ) : (
                                        ""
                                    )}
                                    ثبت نام
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default SellerForm;
