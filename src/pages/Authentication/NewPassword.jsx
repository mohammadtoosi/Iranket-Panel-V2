import React, { useState, useReducer } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import iranketLogo from "../../assets/images/ket.jpg";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState();
    const [password, setPassword] = useState();
    const [rPassword, setRPassword] = useState();

    const onSubmit = (event) => {
        event.preventDefault();
    };

    const onSubmitForm = async () => {
        const token = "b3c3c0c41d0223b9ff10c87b8acb65f5";

        setIsLoading(false);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center position-absolute start-0 end-0 bottom-0 top-0 mt-2">
            <Row className="col-lg-4 border rounded p-4">
                <div className="d-flex flex-column justify-content-center align-content-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <img
                            src={iranketLogo}
                            alt="iranket logo"
                            height="150"
                        />
                    </div>
                    <div className="d-flex justify-content-center align-items-center h5">
                        <p className="">ویرایش رمز عبور</p>
                    </div>
                    <div className="">
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mt-2">
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
                            <Form.Group className="mt-2">
                                <Form.Label>تکرار رمز عبور</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={rPassword}
                                    onChange={(event) => {
                                        setRPassword(event.target.value);
                                    }}
                                    required
                                />
                                <Form.Text className="text-danger">
                                    {rPassword !== password
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
                                    تایید
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <div className="mt-4">
                        <a className="text-decoration-none" href="/signin">
                            بازگشت
                        </a>
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default SignUp;
