import React, { useState, useEffect } from "react";
import axios from "axios";
import { invoice } from "../../routes/api";

import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

const PaymentInfoSection = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getInvoiceData = async () => {
        try {
            const response = await axios.get(invoice, { withCredentials: true });
            setData(response?.data?.psdata);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getInvoiceData();
    }, []);

    return (
        <div className="bg-light p-4 br20px">
            <div className="d-flex">
                <div className="d-flex col-lg-10 mx-3">
                    <p className="h5">امور مالی</p>
                </div>
            </div>
            <div className="row mt-4">
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>مجموع مقدار دریافت شده</th>
                            <th>مقدار پرداخت نشده</th>
                            <th>مقدار لغو شده</th>
                            <th>مبلغ قابل پرداخت برای فاکتور بعدی</th>
                            <th>روش پرداخت</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data.total_funds_display}</td>
                            <td>?</td>
                            <td>{data.total_canceled_commission_tax_excl}</td>
                            <td>?</td>
                            <td>?</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default PaymentInfoSection;
