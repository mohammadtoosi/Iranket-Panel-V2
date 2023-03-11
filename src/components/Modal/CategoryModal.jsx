import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CategoryModalActions } from "../../redux/slice/category-model";

import Modal from "react-bootstrap/Modal";
import List from "react-bootstrap/ListGroup";
import Category from "../Category";

const CategoryModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.category.isOpen);
    const noChild = useSelector((state) => state.category.noChild);
    const categoryNames = useSelector((state) => state.category.NamesArray);

    const closeModalClickHandler = () => {
        dispatch(CategoryModalActions.toggleCategoryModalClickHandler());
    };

    return (
        <Modal show={isOpen} onHide={closeModalClickHandler}>
            <Modal.Header onClick={closeModalClickHandler}>
                <Modal.Title>انتخاب دسته بندی محصول</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Category />
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

export default CategoryModal;
