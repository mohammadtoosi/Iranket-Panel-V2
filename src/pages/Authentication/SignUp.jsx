import React, { useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmActions } from "../../redux/slice/confirm-mobile";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import SellerForm from "./SellerForm";

import auth from "../../routes/auth";

import iranketLogo from "../../assets/images/ket.jpg";

const initialRegisterValues = {
    firstName: "",
    lastName: "",
    gender: 1,
    phoneNumber: "",
    password: "",
    reenteredPassword: "",
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
        case "gender":
            return {
                ...state,
                gender: action.value,
            };
        case "password":
            return {
                ...state,
                password: action.value,
            };
        case "reentered_password":
            return {
                ...state,
                reenteredPassword: action.value,
            };
        default:
            break;
    }
};

const SignUp = () => {
    const rDispatch = useDispatch();
    const showSellerForm = useSelector((state) => state.confirm.showSellerForm);
    const otp = useSelector((state) => state.confirm.otp);
    const [isLoading, setIsLoading] = useState();
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

    const onSubmitForm = async () => {
        console.log("from sign up");
        const key = sessionStorage.getItem("key");

        const nInitialValue = {
            session_key: key,
            otp: otp,
            firstName: state.firstName,
            lastName: state.lastName,
            password: state.password,
            gender: state.gender,
        };
        console.log(nInitialValue);
        try {
            setIsLoading(true);
            const requestOptions = {
                method: "POST",
                body: JSON.stringify({
                    session_key: nInitialValue.session_key,
                    otp: nInitialValue.otp,
                    firstname: nInitialValue.firstName,
                    lastname: nInitialValue.lastName,
                    gender: nInitialValue.gender,
                    password: nInitialValue.password,
                }),
                credentials: "include",
            };
            const response = await fetch(auth.register, requestOptions);
            const data = await response.json();
            console.log(data);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
        rDispatch(ConfirmActions.toggleSellerForm());
    };

    return (
        <Container className="d-flex justify-content-center align-items-center position-absolute start-0 end-0 top-0 bottom-0">
            <div className={`${showSellerForm === true ? "" : "d-none"}`}>
                <SellerForm name={`${state.firstName} ${state.lastName}`} />
            </div>
            <Row
                className={`col-lg-4 border rounded p-4 ${
                    showSellerForm === true ? "d-none" : ""
                }`}
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
                        <p className="">ثبت نام</p>
                    </div>
                    <div className="">
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label>نام</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={state.firstName}
                                    onChange={(event) => {
                                        onInputChange(
                                            "first_name",
                                            event.target.value
                                        );
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>نام خانوادگی</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={state.lastName}
                                    onChange={(event) => {
                                        onInputChange(
                                            "last_name",
                                            event.target.value
                                        );
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>جنسیت</Form.Label>
                                <Form.Select
                                    value={state.gender}
                                    onChange={(event) => {
                                        onInputChange(
                                            "gender",
                                            event.target.value
                                        );
                                    }}
                                    required
                                >
                                    <option value="1">مرد</option>
                                    <option value="2">زن</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>رمز عبور</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={state.password}
                                    onChange={(event) => {
                                        onInputChange(
                                            "password",
                                            event.target.value
                                        );
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>تکرار رمز عبور</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={state.reenteredPassword}
                                    onChange={(event) => {
                                        onInputChange(
                                            "reentered_password",
                                            event.target.value
                                        );
                                    }}
                                    required
                                />
                                <Form.Text className="text-danger">
                                    {state.reenteredPassword !== state.password
                                        ? "لطفا رمز عبور خود را دوباره وارد کنید!"
                                        : ""}
                                </Form.Text>
                            </Form.Group>
                            <div className="col-lg-12 mt-3">
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

export default SignUp;
