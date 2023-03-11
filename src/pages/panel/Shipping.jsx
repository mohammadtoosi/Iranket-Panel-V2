import React from "react";

import Menu from "../../components/menu/Menu";
import Navbar from "../../components/navbar/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ShippingSection from "../../components/Sections/ShippingSection";

const Shipping = () => {
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
                            <ShippingSection />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Shipping;
