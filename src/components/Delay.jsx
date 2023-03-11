import React, { useState, useEffect } from "react";

import Spinner from "react-bootstrap/Spinner";

const Delayed = (props) => {
    const [shown, setShown] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShown(true);
        }, props.wait);
    }, [props.wait]);

    return shown ? (
        props.children
    ) : (
        <>
            <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="info" />
            </div>
        </>
    );
};

export default Delayed;
