import React from "react";

import Menu from "../../components/menu/Menu";
import Navbar from "../../components/navbar/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PaymentInfoSection from "../../components/Sections/PaymentInfoSection";

const PaymentInfo = () => {
    return (
        <>
            <Navbar />
            <Container>
                <Row className="mt-5">
                    <Col lg={3}>
                        <Menu />
                    </Col>
                    <Col lg={9}>
                        <div className="">
                            <PaymentInfoSection />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default PaymentInfo;
