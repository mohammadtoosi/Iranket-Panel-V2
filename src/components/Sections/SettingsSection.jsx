import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";
import { profileSeller, updateSeller } from "../../routes/api";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialRegisterValues = {
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    address: "",
    shop: "",
};

const registerReducer = (state, action) => {
    switch (action.type) {
        case "first_name":
            return {
                ...state,
                firstName: action.value,
            };
        case "last_name":
            return {
                ...state,
                lastName: action.value,
            };
        case "name":
            return {
                ...state,
                name: action.value,
            };
        case "email":
            return {
                ...state,
                email: action.value,
            };
        case "phone":
            return {
                ...state,
                phone: action.value,
            };
        case "state":
            return {
                ...state,
                state: action.value,
            };
        case "city":
            return {
                ...state,
                city: action.value,
            };
        case "address":
            return {
                ...state,
                address: action.value,
            };
        case "shop":
            return {
                ...state,
                shop: action.value,
            };
        default:
            break;
    }
};

const SettingsSection = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState();
    const [state, dispatch] = useReducer(
        registerReducer,
        initialRegisterValues
    );

    const onInputChange = (type, value) => {
        dispatch({
            type: type,
            value: value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
    };

    const fetchProfileSellerData = async () => {
        const sellerId = localStorage.getItem("s_i");
        try {
            const response = await axios.get(profileSeller + sellerId, {
                withCredentials: true,
            });
            setData(response.data.psdata);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProfileSellerData();
    }, []);

    const onSubmitForm = async () => {
        const nInitialValue = {
            name: state.name,
            shop: state.shop,
            email: state.email,
            phone: state.phone,
            state: state.state,
            city: state.city,
            address: state.address,
        };

        try {
            setIsLoading(true);
            const requestOptions = {
                method: "POST",
                body: JSON.stringify({
                    submitSeller: true,
                    action: "update",
                    name: nInitialValue.name,
                    shop: nInitialValue.shop,
                    email: nInitialValue.email,
                    phone: nInitialValue.phone,
                    state: nInitialValue.state,
                    city: nInitialValue.city,
                    address: nInitialValue.address,
                    conditions: true,
                }),
                credentials: "include",
            };
            const response = await fetch(updateSeller, requestOptions);
            const data = await response.json();
            if (data.confirmation) {
                toast.success("پروفایل شما اپدیت شد!", {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    className: "iran",
                });
            }
            console.log(data);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    return (
        <>
            <ToastContainer
                className="iran"
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="bg-light p-4 br20px">
                <div className="d-flex">
                    <div className="d-flex col-lg-10 mx-3">
                        <p className="h5">ویرایش حساب کاربری</p>
                    </div>
                </div>
                <div className="row mt-4">
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mt-2 col-lg-6">
                            <Form.Label>نام</Form.Label>
                            <Form.Control
                                type="text"
                                value={state.name}
                                className="p-3"
                                onChange={(event) => {
                                    onInputChange("name", event.target.value);
                                }}
                                placeholder={data?.seller?.name}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2 col-lg-6">
                            <Form.Label>نام فروشگاه</Form.Label>
                            <Form.Control
                                type="text"
                                value={state.shop}
                                className="p-3"
                                onChange={(event) => {
                                    onInputChange("shop", event.target.value);
                                }}
                                placeholder={data?.seller?.name}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2 col-lg-6">
                            <Form.Label>ایمیل</Form.Label>
                            <Form.Control
                                type="email"
                                value={state.email}
                                className="p-3"
                                onChange={(event) => {
                                    onInputChange("email", event.target.value);
                                }}
                                placeholder={data?.seller?.email}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2 col-lg-6">
                            <Form.Label>تلفن</Form.Label>
                            <Form.Control
                                type="text"
                                value={state.phone}
                                className="p-3"
                                onChange={(event) => {
                                    onInputChange("phone", event.target.value);
                                }}
                                placeholder={data?.seller?.phone}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2 col-lg-6">
                            <Form.Label>استان</Form.Label>
                            <Form.Control
                                type="text"
                                value={state.state}
                                className="p-3"
                                onChange={(event) => {
                                    onInputChange("state", event.target.value);
                                }}
                                placeholder={data?.seller?.state}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2 col-lg-6">
                            <Form.Label>شهر</Form.Label>
                            <Form.Control
                                type="text"
                                value={state.city}
                                className="p-3"
                                onChange={(event) => {
                                    onInputChange("city", event.target.value);
                                }}
                                placeholder={data?.seller?.city}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2 col-lg-6">
                            <Form.Label>ادرس</Form.Label>
                            <Form.Control
                                type="text"
                                value={state.address}
                                className="p-3"
                                onChange={(event) => {
                                    onInputChange(
                                        "address",
                                        event.target.value
                                    );
                                }}
                                placeholder={data?.seller?.address}
                                required
                            />
                        </Form.Group>
                        <div className="col-lg-3 mt-3 d-flex justify-content-end align-items-end">
                            <Button
                                variant="info w-100 text-white p-2"
                                onClick={onSubmitForm}
                                disabled={isLoading === true ? true : false}
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
                                بروزرسانی
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default SettingsSection;
