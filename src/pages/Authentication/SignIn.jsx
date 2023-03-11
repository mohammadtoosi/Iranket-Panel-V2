import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ConfirmActions } from "../../redux/slice/confirm-mobile";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import SignUp from "./SignUp";
import SignInWithPassword from "./SignInWithPassword";
import ConfirmPhoneNumber from "./ConfirmPhoneNumber";

import iranketLogo from "../../assets/images/ket.jpg";

import {
    requestOptions,
    postRequestOptions,
} from "../../routes/request-options";
import auth from "../../routes/auth";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState();
    const [status, setStatus] = useState(false);
    const [mobile, setMobile] = useState("");

    const passwordForm = useSelector((state) => state.confirm.showPasswordForm);
    const registerForm = useSelector((state) => state.confirm.showRegisterForm);
    const otpForm = useSelector((state) => state.confirm.showOtpForm);

    const onSubmit = (event) => {
        event.preventDefault();
    };

    const otpRequestAsync = async () => {
        console.log("from signin component");
        const options = {
            method: "POST",
            body: JSON.stringify({ mobile: mobile }),
            credentials: "include",
        };
        try {
            const response = await fetch(auth.requestOtp, options);
            if (response.ok || response.status === 200) {
                const data = await response.json();
                const key = data.psdata.session_key;
                sessionStorage.setItem("key", key);
                console.log(data);
                console.log(key);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmitForm = async () => {
        setIsLoading(true);
        const options = {
            method: "GET",
        };
        try {
            const response = await fetch(auth.check + mobile, options);
            const data = await response.json();
            console.log(response);
            console.log(data);
            if (data?.psdata?.is_registered) {
                setStatus(true);
                dispatch(ConfirmActions.togglePasswordForm());
            } else if (!data?.psdata?.is_registered) {
                setStatus(false);
                otpRequestAsync();
                dispatch(ConfirmActions.toggleOtpForm());
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const loginWithPassword = (
        <div className={`${passwordForm === true ? "" : "d-none"}`}>
            <SignInWithPassword mobile={mobile} />
        </div>
    );

    const signUp = (
        <div className={`${registerForm === true ? "" : "d-none"}`}>
            <SignUp />
        </div>
    );

    const otp = (
        <div className={`${otpForm === true ? "" : "d-none"}`}>
            <ConfirmPhoneNumber />
        </div>
    );

    return (
        <Container className="d-flex justify-content-center align-items-center position-absolute start-0 end-0 top-0 bottom-0 mt-2">
            {loginWithPassword}
            {signUp}
            {otp}
            <Row
                className={`col-lg-4 border rounded p-4 ${
                    passwordForm === true
                        ? "d-none"
                        : registerForm === true
                        ? "d-none"
                        : ""
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
                        <p className="">لطفا شماره موبایل خود را وارد کنید</p>
                    </div>
                    <div className="">
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label>شماره موبایل</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={mobile}
                                    onChange={(event) => {
                                        setMobile(event.target.value);
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
            </Row>
        </Container>
    );
};

export default SignIn;
