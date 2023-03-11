import React from "react";

import { Shop } from "react-bootstrap-icons";

const ActiveShop = ({ orders, products, sold, earn }) => {
    return (
        <div className="bg-light p-4 br20px">
            <div className="d-flex">
                <div className="d-flex col-lg-10 mx-3">
                    <Shop
                        className="text-primary position-absolute"
                        size="30"
                    />
                    <p className="h5 mx-5 mt-1">غرفه فعال</p>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-6 border-start">
                    <div className="d-flex">
                        <div className="col-lg-11">
                            <p className="text-secondary h5">تعداد سفارشات</p>
                        </div>
                        <div className="">
                            <p className="bold">{orders}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-flex">
                            <div className="col-lg-11">
                                <p className="text-secondary h5">
                                    تعداد محصول فروش رفته
                                </p>
                            </div>
                            <div className="">
                                <p className="bold">{sold}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                <div className="d-flex">
                        <div className="col-lg-11">
                            <p className="text-secondary h5">تعداد محصول</p>
                        </div>
                        <div className="">
                            <p className="bold">{products}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-flex">
                            <div className="col-lg-9">
                                <p className="text-dark h5 bold">
                                    میزان فروش
                                </p>
                            </div>
                            <div className="mx-5">
                                <p className="bold">{earn}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveShop;
