import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ConfirmActions } from "../../redux/slice/confirm-mobile";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import auth from "../../routes/auth";

import iranketLogo from "../../assets/images/ket.jpg";

const ConfirmPhoneNumber = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState();
    const [otp, setOTP] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
    };

    const onSubmitForm = async () => {
        if (otp !== "") {
            dispatch(ConfirmActions.toggleOtpForm());
            dispatch(ConfirmActions.toggleRegisterForm());
            dispatch(ConfirmActions.setOtp(otp));
        }
    };

    const backClickHandler = () => {
        dispatch(ConfirmActions.toggleOtpForm());
    };

    return (
        <Container className="d-flex justify-content-center align-items-center position-absolute start-0 end-0 top-0 bottom-0 mt-2">
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
                        <p className="">تایید شماره موبایل</p>
                    </div>
                    <div className="">
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label>کد 4 رقمی</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={otp}
                                    onChange={(event) => {
                                        setOTP(`${event.target.value}`);
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
                                    تایید شماره موبایل
                                </Button>
                            </div>
                            <div className="col-lg-12 mt-2">
                                <Button
                                    variant="info w-100 text-white p-2"
                                    onClick={backClickHandler}
                                >
                                    بازگشت
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default ConfirmPhoneNumber;
