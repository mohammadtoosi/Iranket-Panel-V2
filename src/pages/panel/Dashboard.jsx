import React, { useState, useEffect } from "react";
import axios from "axios";
import { dashboard } from "../../routes/api";
import $ from "jquery";

import Menu from "../../components/menu/Menu";
import Navbar from "../../components/navbar/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FinantialStatus from "../../components/Sections/FinantialStatus";
import ActiveShop from "../../components/Sections/ActiveShop";
import SellAndViewData from "../../components/Sections/SellAndViewsData";
import ProducsAndSells from "../../components/Sections/ProductsAndSells";
import OrdersSection from "../../components/Sections/OrdersSection";

const Dashboard = () => {
    const [data, setData] = useState([]);

    const detailsHandler = async () => {
        try {
            const response = await axios.get(dashboard, {
                withCredentials: true,
            });
            setData(response.data.psdata);
            console.log(response?.data?.psdata?.seller?.id);
            localStorage.setItem("s_i", response?.data?.psdata?.seller?.id);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        detailsHandler();
    }, []);

    const sendRequestAsync = async () => {
        try {
            console.log("Starting ...");
            const response = await axios.get(
                "https://app.iranket.com/rest/sellerproduct?action=update&id_product=6579",
                { withCredentials: true }
            );
            console.log(response.data.psdata);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <Container onClick={sendRequestAsync}>
                <Row className="mt-5">
                    <Col lg={3}>
                        <Menu />
                    </Col>
                    <Col lg={9}>
                        <div className="">
                            <FinantialStatus
                                last={data?.to}
                                value={data?.total_canceled_commission_tax_excl}
                            />
                        </div>
                        <div className="mt-3">
                            <ActiveShop
                                orders={data?.num_orders}
                                products={data?.num_products}
                                sold={data?.num_transfers_accepted}
                                earn={data?.sales}
                            />
                        </div>
                        {/* <div className="mt-3">
                            <SellAndViewData />
                        </div> */}
                        <div className="mt-3">
                            <OrdersSection />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;
