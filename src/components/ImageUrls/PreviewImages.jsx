import React from "react";

import ImageCard from "./ImageCard";

const PreviewUrls = (props) => {
    return (
        <div className="">
            <div className="row g-1">
                {props.urls.map((image, i) => (
                    <div className="col-lg-3">
                        <ImageCard url={image} alt={i} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreviewUrls;
