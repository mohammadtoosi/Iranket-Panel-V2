import React from "react";

import Table from "react-bootstrap/Table";
import { Search } from "react-bootstrap-icons";

const ProductsAndSells = () => {
    return (
        <div className="bg-light p-4 br20px">
            <div className="d-flex">
                <div className="d-flex col-lg-10 mx-3">
                    <p className="h5">محصولات و فروش</p>
                </div>
            </div>
            <div className="row mt-4">
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>نام مشتری</th>
                            <th>محصولات</th>
                            <th>مجموع بدون مالیات</th>
                            <th>تاریخ</th>
                            <th>وضعیت</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-primary">Leyla Ahmadi</td>
                            <td>1</td>
                            <td>242,000 تومان</td>
                            <td>2022-05-08</td>
                            <td>پرداخت شده</td>
                            <td>
                                <button className="btn">
                                    <Search size="25" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-primary">Leyla Ahmadi</td>
                            <td>1</td>
                            <td>242,000 تومان</td>
                            <td>2022-05-08</td>
                            <td>پرداخت شده</td>
                            <td>
                                <button className="btn">
                                    <Search size="25" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-primary">Leyla Ahmadi</td>
                            <td>1</td>
                            <td>242,000 تومان</td>
                            <td>2022-05-08</td>
                            <td>پرداخت شده</td>
                            <td>
                                <button className="btn">
                                    <Search size="25" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-primary">Leyla Ahmadi</td>
                            <td>1</td>
                            <td>242,000 تومان</td>
                            <td>2022-05-08</td>
                            <td>پرداخت شده</td>
                            <td>
                                <button className="btn">
                                    <Search size="25" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-primary">Leyla Ahmadi</td>
                            <td>1</td>
                            <td>242,000 تومان</td>
                            <td>2022-05-08</td>
                            <td>پرداخت شده</td>
                            <td>
                                <button className="btn">
                                    <Search size="25" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ProductsAndSells;
