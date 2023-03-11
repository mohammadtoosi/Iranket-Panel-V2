import React from "react";

import Menu from "../../components/menu/Menu";
import Navbar from "../../components/navbar/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddProductSection from "../../components/Sections/AddProductSection";

const AddProduct = () => {
    return (
        <>
            <Navbar />
            <Container>
                <Row className="mt-5">
                    <Col lg={3}>
                        <Menu />
                    </Col>
                    <Col lg={9}>
                        <AddProductSection />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AddProduct;
