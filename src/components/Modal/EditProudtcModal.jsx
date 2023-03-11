import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProductEditActions } from "../../redux/slice/product-edit";
import axios from "axios";
import { product } from "../../routes/api";

import Modal from "react-bootstrap/Modal";
import EditProductSection from "../Sections/EditProductSection";

const ProductEditModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.productEdit.isOpen);

    const closeModalClickHandler = () => {
        dispatch(ProductEditActions.toggleProductEditDialog());
    };
   
    return (
        <Modal show={isOpen} onHide={closeModalClickHandler}>
            <Modal.Header onClick={closeModalClickHandler}>
                <Modal.Title>ویرایش محصول</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditProductSection />
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-danger"
                    onClick={closeModalClickHandler}
                >
                    بستن
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductEditModal;
