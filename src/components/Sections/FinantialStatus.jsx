import React from "react";

import { ArrowLeftShort, Calendar } from "react-bootstrap-icons";

const FinantialStatus = ({last, value}) => {
    return (
        <div className="bg-light p-4 br20px">
            <div className="d-flex">
                <div className="d-flex col-lg-10 mx-3">
                    <p className="h5">وضعیت مالی</p>
                </div>
                <div className="h4 mx-4">
                    <a href="#link" className="h5">
                        بیشتر
                        <ArrowLeftShort />
                    </a>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-6 border-start">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <p className="bold h5">
                            {last}
                            <span className="mx-1">
                                <Calendar className="text-secondary" />
                            </span>
                        </p>
                        <p className="text-secondary h4 mt-2">اخرین تسویه</p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <p className="bold h4">
                            {/* 0 <span className="text-secondary mx-1">تومان</span> */}
                            <span className="mx-1">{value}</span>
                        </p>
                        <p className="text-secondary h4 mt-2">مبلغ قابل تسویه شما</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinantialStatus;
