import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilesActions } from "../../../redux/slice/files";

import { Image } from "react-bootstrap-icons";

const UploadButton = () => {
    const dispatch = useDispatch();
    const fileRef = useRef();
    const [file, setFile] = useState([]);
    const [fileDataUrl, setFileDataUrl] = useState([]);

    const changeHandler = (e) => {
        setFile(e.target.files);
        const selectedFiles = [];
        const targetFiles = e.target.files;
        const targetFilesObject = [...targetFiles];
        targetFilesObject.map((file) => {
            return selectedFiles.push(URL.createObjectURL(file));
        });
        setFileDataUrl(selectedFiles);
    };

    useEffect(() => {
        dispatch(FilesActions.addFilesHandler(file));
        dispatch(FilesActions.setEdited(file));
        // console.log(file);
    }, [file]);

    useEffect(() => {
        dispatch(FilesActions.setImageUrls(fileDataUrl));
    }, [fileDataUrl]);

    return (
        <>
            <button
                className="btn shadow-sm p-3"
                onClick={() => fileRef.current.click()}
            >
                <div className="d-flex align-items-center flex-column">
                    <Image size="25" />
                    <p className="mt-1">انتخاب عکس</p>
                </div>
            </button>
            <input
                ref={fileRef}
                onChange={changeHandler}
                multiple={true}
                type="file"
                name="file"
                hidden
                accept="image/*"
            />
        </>
    );
};

export default UploadButton;
