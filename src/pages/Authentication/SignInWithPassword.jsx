import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ConfirmActions } from "../../redux/slice/confirm-mobile";
import auth from "../../routes/auth";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import ConfirmLogin from "./ConfirmLogin";

import iranketLogo from "../../assets/images/ket.jpg";
import { useNavigate } from "react-router-dom";

const SignInWithPassword = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const otpLogin = useSelector((state) => state.confirm.showOTPLogin);

    const [isLoading, setIsLoading] = useState();
    // const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState();

    const onSubmit = (event) => {
        event.preventDefault();
    };

    const onSubmitForm = async () => {
        setIsLoading(true);
        try {
            setIsLoading(true);
            const requestOptions = {
                method: "POST",
                body: JSON.stringify({
                    mobile: props.mobile,
                    password: password,
                }),
                credentials: "include",
            };
            const response = await fetch(auth.login, requestOptions);
            if (response.ok || response.status === 200) {
                sessionStorage.setItem("is_a", true);
                navigate("/dashboard");
            }
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    const otpRequestAsync = async () => {
        const options = {
            method: "POST",
            body: JSON.stringify({ mobile: props.mobile }),
        };
        try {
            const response = await fetch(auth.requestOtp, options);
            if (response.ok || response.status === 200) {
                const data = await response.json();
                const key = data.psdata.session_key;
                sessionStorage.setItem("key", key);
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const showOtpFormClickHandler = () => {
        otpRequestAsync();
        dispatch(ConfirmActions.toggleOTPLogin());
    };

    return (
        <Container
            onClick={() => {
                console.log("hello");
                console.log(document.cookie);
            }}
            className="d-flex justify-content-center align-items-center position-absolute start-0 end-0 top-0 bottom-0 mt-2"
        >
            <div className={`${otpLogin ? "" : "d-none"}`}>
                <ConfirmLogin />
            </div>
            <Row
                className={`col-lg-4 border rounded p-4 ${otpLogin ? "d-none" : ""}`}
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
                        <p className="">ورود با رمز عبور</p>
                    </div>
                    <div className="">
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label>شماره همراه</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={props.mobile}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>رمز عبور</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                    required
                                />
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
                                    تایید
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        className="btn text-primary"
                        onClick={showOtpFormClickHandler}
                    >
                        <i className="bi bi-box-arrow-in-left"></i>
                        ورود با کد یک بار مصرف
                    </button>
                </div>
                {/* <div className="mt-2">
                    <a
                        className="text-decoration-none"
                        href="/reset-password"
                    >
                        <i classNam="bi bi-box-arrow-in-left "></i>
                        فراموشی رمز عبور
                    </a>
                </div> */}
            </Row>
        </Container>
    );
};

export default SignInWithPassword;
