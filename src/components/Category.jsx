import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryModalActions } from "../redux/slice/category-model";
import axios from "axios";

import List from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";

import { ArrowLeftShort } from "react-bootstrap-icons";

const Category = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedCategoryName, setSelectedCategoryName] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryLoader, setCategoryLoader] = useState(false);

    useEffect(() => {
        setCategory(data);
    }, [data]);

    useEffect(() => {
        dispatch(CategoryModalActions.setNamesArray(selectedCategoryName));
    }, [selectedCategoryName]);

    useEffect(() => {
        dispatch(CategoryModalActions.setIDArray(selectedCategory));
    }, [selectedCategory]);

    const selectCategoryClickHandler = (category) => {
        if (category.children) {
            // console.log(category);
            setCategory(category.children);
            setSelectedCategory([...selectedCategory, category.id_category]);
            setSelectedCategoryName([...selectedCategoryName, category.name]);
            // dispatch(CategoryModalActions.setIDArray(selectedCategory));
            // dispatch(CategoryModalActions.setNamesArray(selectedCategoryName));
        } else if (!category.children) {
            setSelectedCategory([...selectedCategory, category.id_category]);
            setSelectedCategoryName([...selectedCategoryName, category.name]);
            // dispatch(CategoryModalActions.setIDArray(selectedCategory));
            // dispatch(CategoryModalActions.setNamesArray(selectedCategoryName));
            // dispatch(CategoryModalActions.setNoChildren(true));
            dispatch(CategoryModalActions.toggleCategoryModalClickHandler());
        }
        console.log(category.children);
    };

    const resetListClickHandler = () => {
        setCategory(data);
        setSelectedCategory([]);
        setSelectedCategoryName([]);
        dispatch(CategoryModalActions.setIDArray([]));
        dispatch(CategoryModalActions.setNamesArray([]));
    };

    const detailsHandler = async () => {
        setLoading(true);
        const productId  = localStorage.getItem("pd");
        try {
            const response = await axios.get(
                `https://app.iranket.com/rest/sellerproduct?action=update&id_product=${productId}`,
                {
                    withCredentials: true,
                }
            );
            setData(response.data.psdata.categoryTreeNoKeys[0]?.children);

            console.log(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        detailsHandler();
    }, []);

    return (
        <>
            <div className="col-lg-12">
                <List className="p-3">
                    {loading ? (
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" variant="info" />
                        </div>
                    ) : (
                        <Delayed wait="1300">
                            {category.map((item, index) => (
                                <List.Item
                                    action
                                    key={index}
                                    onClick={() =>
                                        selectCategoryClickHandler(item)
                                    }
                                    className="border-0"
                                >
                                    <div className="d-flex">
                                        <div className="col-lg-11">
                                            {item.name}
                                        </div>
                                        <div className="">
                                            <ArrowLeftShort size="25" />
                                        </div>
                                    </div>
                                </List.Item>
                            ))}
                        </Delayed>
                    )}
                    <div className="mt-3">
                        {selectedCategory.length !== 0 && (
                            <List.Item action onClick={resetListClickHandler}>
                                برگشت
                            </List.Item>
                        )}

                        {selectedCategoryName.length !== 0 && (
                            <List.Item>
                                دسته بندی:
                                {selectedCategoryName.map((name, i) => (
                                    <span key={i}> - {name} </span>
                                ))}
                            </List.Item>
                        )}
                    </div>
                </List>
            </div>
        </>
    );
};

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

export default Category;
