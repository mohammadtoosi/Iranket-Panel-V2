import React from "react";

import { Trash } from "react-bootstrap-icons";

const ImageCard = (props) => {
    return (
        <div className="bg-light p-4 d-flex flex-column justify-content-center align-items-center rounded">
            <img
                style={{ backgroundColor: "white" }}
                width="100"
                height="100"
                src={props.url}
                alt={props.alt}
            />
            {props.deleteButton && (
                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-danger" onClick={props.onClick}>
                        <Trash size="25" />
                    </button>
                </div>
            )}
        </div>
    );
};
export default ImageCard;
