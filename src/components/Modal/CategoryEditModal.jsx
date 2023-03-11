import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CategoryEditModalActions } from "../../redux/slice/category-edit-modal";

import Modal from "react-bootstrap/Modal";
import List from "react-bootstrap/ListGroup";
import CategoryEdit from "../CategoryEdit";

const CategoryEditModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.categoryEdit.isOpen);
    const noChild = useSelector((state) => state.categoryEdit.noChild);
    const categoryNames = useSelector((state) => state.categoryEdit.NamesArray);

    const closeModalClickHandler = () => {
        dispatch(CategoryEditModalActions.toggleCategoryModalClickHandler());
    };

    return (
        <Modal show={isOpen} onHide={closeModalClickHandler}>
            <Modal.Header onClick={closeModalClickHandler}>
                <Modal.Title>انتخاب دسته بندی محصول</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CategoryEdit />
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

export default CategoryEditModal;
