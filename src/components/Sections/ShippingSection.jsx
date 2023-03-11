import React, { useState } from "react";
import { carrier } from "../../routes/api";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const ShippingSection = () => {
    const [shipping, setShipping] = useState("");
    const [shippingPrice, setShippingPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const updateCarrier = async () => {
        setLoading(true);
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                submitCarrier: true,
                action: "update",
                id_carrier: 21,
                carrier_name: "Name Of Carrier",
                url: "https://somewher.com",
                delay_1: shipping,
                is_free: false,
                shipping_method: 1,
                zone_3: true,
                fees: {
                    3: shippingPrice,
                },
                groupBox: [3],
                range_inf: [0],
                range_sup: [0],
                associate_products: true,
            }),
            credentials: "include",
        };
        try {
            const response = await fetch(carrier.carrier, requestOptions);
            const data = await response.json();
            console.log(response);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <>
            <div className="bg-light p-4 br20px">
                <div className="d-flex">
                    <div className="d-flex col-lg-10 mx-3">
                        <p className="h5">زمان حمل</p>
                    </div>
                </div>
                <div className="row mt-4">
                    <Form>
                        <Form.Group>
                            <Form.Label>زمان ارسال</Form.Label>
                            <Form.Control
                                value={shipping}
                                onChange={(e) => setShipping(e.target.value)}
                            />
                            <Form.Text>
                                زمان تحویل تخمینی طی فرایند پرداخت نمایش داده
                                خواهد شد.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>هزینه ارسال</Form.Label>
                            <Form.Control
                                value={shippingPrice}
                                onChange={(e) =>
                                    setShippingPrice(e.target.value)
                                }
                            />
                        </Form.Group>
                    </Form>
                </div>
                <div className="d-flex justify-content-end align-items-end mt-5">
                    <Button variant="success" onClick={updateCarrier}>
                        {loading && (
                            <Spinner
                                className="mx-2"
                                variant="light"
                                animation="border"
                                size="sm"
                            />
                        )}
                        ارسال
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ShippingSection;
