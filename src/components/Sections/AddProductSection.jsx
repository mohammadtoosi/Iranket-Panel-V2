import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryModalActions } from "../../redux/slice/category-model";
import { FilesActions } from "../../redux/slice/files";
import axios from "axios";
import { product } from "../../routes/api";
import { toast } from "react-toastify";

import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CategoryModal from "../Modal/CategoryModal";
import UploadButton from "../UI/button/UploadButton";
import Spinner from "react-bootstrap/Spinner";
import PreviewUrls from "../ImageUrls/PreviewImages";

import { Trash } from "react-bootstrap-icons";

const initialState = {
    pTitle: "",
    pCategory: [],
    pPrice: "",
    pSPrice: "",
    pQuantity: "",
    pDescription: "",
    pASize: "",
    goodFor: "",
    otherDescription: "",
    pType: "",
    pBSize: "",
    pColor: "",
    usedFor: "",
    keepAndWash: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "title":
            return {
                ...state,
                pTitle: action.value,
            };
        case "category":
            return {
                ...state,
                pCategory: action.value,
            };
        case "price":
            return {
                ...state,
                pPrice: action.value,
            };
        case "sprice":
            return {
                ...state,
                pSPrice: action.value,
            };
        case "quantity":
            return {
                ...state,
                pQuantity: action.value,
            };
        case "description":
            return {
                ...state,
                pDescription: action.value,
            };
        case "asize":
            return {
                ...state,
                pASize: action.value,
            };
        case "goodfor":
            return {
                ...state,
                goodFor: action.value,
            };
        case "o_desc":
            return {
                ...state,
                otherDescription: action.value,
            };
        case "type":
            return {
                ...state,
                pType: action.value,
            };
        case "bsize":
            return {
                ...state,
                pBSize: action.value,
            };
        case "color":
            return {
                ...state,
                pColor: action.value,
            };
        case "usedfor":
            return {
                ...state,
                usedFor: action.value,
            };
        case "keepandwash":
            return {
                ...state,
                keepAndWash: action.value,
            };
        default:
            break;
    }
};

const ProductsSection = () => {
    const dispatch = useDispatch();
    const names = useSelector((state) => state.category.NamesArray);
    const categories = useSelector((state) => state.category.IDArray);
    const files = useSelector((state) => state.files.files);
    const urls = useSelector((state) => state.files.urls);
    const [state, rDispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const productId = localStorage.getItem("pd");

    const onInputChange = (type, value) => {
        rDispatch({
            type: type,
            value: value,
        });
    };

    const openCategoryModalClickHandler = () => {
        dispatch(CategoryModalActions.toggleCategoryModalClickHandler());
    };

    const removeImagesAndUrls = () => {
        dispatch(FilesActions.addFilesHandler([]));
        dispatch(FilesActions.setFileHandler([]));
        dispatch(FilesActions.setImageUrls([]));
    };

    const addProductClickHandler = async () => {
        setLoading(true);
        const productId = localStorage.getItem("pd");
        const initialData = {
            submitProduct: true,
            action: "update",
            id_product: productId,
            name_1: state.pTitle,
            categories: categories,
            description_1: state.pDescription,
            quantity: state.pQuantity,
            wholesale_price: state.pPrice,
            price: state.pPrice,
        };
        const options = {
            method: "POST",
            body: JSON.stringify(initialData),
            credentials: "include",
        };
        try {
            const response = await fetch(product.index, options);
            const data = await response.json();
            if (data.code === 20 || data.success) {
                toast(`${initialData.name_1} با موفقیت ثبت شد`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            console.log(data);
            uploadImagesAsync();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const uploadImagesAsync = async () => {
        setUploadLoading(true);
        console.log(files);
        const productId = localStorage.getItem("pd");

        const formData = new FormData();
        if (files.length === 1) {
            formData.append("submitProduct", true);
            formData.append("action", "update");
            formData.append("id_product", productId);
            formData.append("images[1]", files[0]);
        }
        if (files.length > 1) {
            formData.append("submitProduct", true);
            formData.append("action", "update");
            formData.append("id_product", productId);
            // append for 15 times
            formData.append("images[1]", files[0]);
            formData.append("images[2]", files[1]);
            formData.append("images[3]", files[2]);
            formData.append("images[4]", files[3]);
            formData.append("images[5]", files[4]);
            formData.append("images[6]", files[5]);
            formData.append("images[7]", files[6]);
            formData.append("images[8]", files[7]);
            formData.append("images[9]", files[8]);
            formData.append("images[10]", files[9]);
            formData.append("images[11]", files[10]);
            formData.append("images[12]", files[11]);
            formData.append("images[13]", files[12]);
            formData.append("images[14]", files[13]);
            formData.append("images[15]", files[14]);
            // for does not work here!
            // for (let i = 1; i <= files.length; i++) {
            //     for (let j = 0; j <= files.length; j++) {
            //         formData.append(`images[${i}]`, files[j]);
            //     }
            // }
        }

        // const initialData = {
        //     submitProduct: true,
        //     action: "update",
        //     id_product: productId,
        //     images: files
        // };
        const options = {
            method: "POST",
            body: formData,
            credentials: "include",
        };
        try {
            const response = await fetch(product.productWithImage, options);
            const data = await response.json();
            console.log("data from upload images", data);
        } catch (error) {
            console.log(error);
        }
        setUploadLoading(false);
    };

    useEffect(() => {
        console.log(files);
        if (files.length > 1) {
            console.log(true);
        }
    }, [files]);

    return (
        <>
            <CategoryModal id={productId} />
            <div className="bg-light p-4 br20px">
                <div className="d-flex">
                    <div className="d-flex col-lg-9 mx-3">
                        <p className="h5">خانه {">"} افزودن محصول</p>
                    </div>
                </div>
                <div className="row mt-4">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>نام و دسته بندی</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-lg-6">
                                    <Form>
                                        <Form.Label className="w-100">
                                            <div className="d-flex">
                                                <p className="h6 w-100">
                                                    عنوان محصول
                                                </p>
                                            </div>
                                        </Form.Label>
                                        <Form.Control
                                            className="p-3"
                                            type="text"
                                            value={state.pTitle}
                                            onChange={(event) => {
                                                onInputChange(
                                                    "title",
                                                    event.target.value
                                                );
                                            }}
                                        />
                                        {/* <Form.Text className="text-danger">
                                            نام محصول باید شامل حداقل دو کلمه و
                                            هر کلمه حداقل دو حرف یا عدد باشد.
                                        </Form.Text> */}
                                    </Form>
                                </div>
                                <div className="mt-3">
                                    <button
                                        className="btn text-primary"
                                        onClick={openCategoryModalClickHandler}
                                    >
                                        انتخاب دسته بندی
                                    </button>
                                    <div className="">
                                        <p>
                                            {names?.map((name, i) => (
                                                <span key={i}> - {name}</span>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item className="mt-2" eventKey="1">
                            <Accordion.Header>تصاویر و ویدیو</Accordion.Header>
                            <Accordion.Body>
                                <div className="d-flex">
                                    <div>
                                        <UploadButton />
                                    </div>
                                    <div className="mx-3">
                                        <button
                                            className="btn shadow-sm p-3"
                                            onClick={removeImagesAndUrls}
                                        >
                                            <div className="d-flex align-items-center flex-column">
                                                <Trash size="25" />
                                                <p className="mt-1">حذف عکس</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <PreviewUrls urls={urls} />
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item className="mt-2" eventKey="2">
                            <Accordion.Header>
                                وزن - قیمت و موجودی
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="col-lg-6">
                                    <Form>
                                        <Form.Group>
                                            <Form.Label className="w-100">
                                                <div className="d-flex">
                                                    <p className="h6 w-100">
                                                        قیمت محصول
                                                    </p>
                                                    <p className="text-secondary">
                                                        تومان
                                                    </p>
                                                </div>
                                            </Form.Label>
                                            <Form.Control
                                                className="p-3"
                                                type="text"
                                                value={state.pPrice}
                                                onChange={(event) => {
                                                    onInputChange(
                                                        "price",
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </Form.Group>
                                        {/* <Form.Group className="mt-4">
                                            <Form.Label className="w-100">
                                                <div className="d-flex">
                                                    <p className="h6 w-100">
                                                        قیمت به تومان (اختیاری)
                                                    </p>
                                                    <p className="text-secondary">
                                                        تومان
                                                    </p>
                                                </div>
                                            </Form.Label>
                                            <Form.Control
                                                className="p-3"
                                                type="text"
                                            />
                                        </Form.Group> */}
                                        <Form.Group className="mt-4">
                                            <Form.Label className="w-100">
                                                <div className="d-flex">
                                                    <p className="h6 w-100">
                                                        تعداد موجودی
                                                    </p>
                                                </div>
                                            </Form.Label>
                                            <Form.Control
                                                className="p-3"
                                                type="number"
                                                value={state.pQuantity}
                                                onChange={(event) => {
                                                    onInputChange(
                                                        "quantity",
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </Form.Group>
                                    </Form>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item className="mt-2" eventKey="3">
                            <Accordion.Header>ویژگی های محصول</Accordion.Header>
                            <Accordion.Body></Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item className="mt-2" eventKey="4">
                            <Accordion.Header>
                                سایر ویژگی های محصول (اختیاری)
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="col-lg-6">
                                    <Form>
                                        <div class="mb-3">
                                            <label
                                                for="exampleFormControlTextarea1"
                                                class="form-label"
                                            >
                                                توضیحات محصول (اختیاری)
                                            </label>
                                            <textarea
                                                class="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="5"
                                                value={state.pDescription}
                                                onChange={(event) => {
                                                    onInputChange(
                                                        "description",
                                                        event.target.value
                                                    );
                                                }}
                                            ></textarea>
                                        </div>
                                        <Form.Group className="mt-4">
                                            <Form.Label className="w-100">
                                                ابعاد (اختیاری)
                                            </Form.Label>
                                            <Form.Control
                                                className="p-3"
                                                type="text"
                                                placeholder="مثلا ۵۰۰ * ۱۲۰ میلیمتر"
                                                value={state.pASize}
                                                onChange={(event) => {
                                                    onInputChange(
                                                        "asize",
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mt-4">
                                            <Form.Label className="w-100">
                                                مناسب برای (اختیاری)
                                            </Form.Label>
                                            <Form.Control
                                                className="p-3"
                                                type="text"
                                                placeholder="مثلا: ورزش نوجوانان"
                                                value={state.goodFor}
                                                onChange={(event) => {
                                                    onInputChange(
                                                        "goodfor",
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mt-4">
                                            <Form.Label className="w-100">
                                                سایر توضیحات (اختیاری)
                                            </Form.Label>
                                            <Form.Control
                                                className="p-3"
                                                type="text"
                                                placeholder="هر ویژگی که معرفی محصولتان را تکمیل می کند."
                                                value={state.otherDescription}
                                                onChange={(event) => {
                                                    onInputChange(
                                                        "o_desc",
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mt-4">
                                            <Form.Label className="w-100">
                                                جنس (اختیاری)
                                            </Form.Label>
                                            <Form.Control
                                                className="p-3"
                                                type="text"
                                                placeholder="مثلا: چرم کتان"
                                                value={state.type}
                                                onChange={(event) => {
                                                    onInputChange(
                                                        "type",
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mt-4">
                                            <Form.Label className="w-100">
                                                سایز (اختیاری)
                                            </Form.Label>
                                            <Form.Control
                                                className="p-3"
                                                type="text"
                                                placeholder="مثلا: ۳۸, xl, مدیوم"
                                                value={state.pBSize}
                                                onChange={(event) => {
                                                    onInputChange(
                                                        "bsize",
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mt-4">
                                            <Form.Label className="w-100">
                                                رنگ (اختیاری)
                                            </Form.Label>
                                            <Form.Control
                                                className="p-3"
                                                type="text"
                                                placeholder="مثلا: سفید طلایی"
                                                value={state.pColor}
                                                onChange={(event) => {
                                                    onInputChange(
                                                        "color",
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mt-4">
                                            <Form.Label className="w-100">
                                                موارد استفاده (اختیاری)
                                            </Form.Label>
                                            <Form.Control
                                                className="p-3"
                                                type="text"
                                                value={state.usedFor}
                                                onChange={(event) => {
                                                    onInputChange(
                                                        "usedfor",
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mt-4">
                                            <Form.Label className="w-100">
                                                نحوه ی نگهداری و شستشو (اختیاری)
                                            </Form.Label>
                                            <Form.Control
                                                className="p-3"
                                                type="text"
                                                value={state.keepAndWash}
                                                onChange={(event) => {
                                                    onInputChange(
                                                        "keepandwash",
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </Form.Group>
                                    </Form>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <div className="">
                        <p className="text-success mx-4 mt-3">
                            {uploadLoading && (
                                <>
                                    <Spinner
                                        className="mx-2"
                                        animation="border"
                                        variant="success"
                                        size="sm"
                                    />
                                    درحال اپلود عکس ها
                                </>
                            )}
                        </p>
                    </div>
                    <div className="mt-3 d-flex justify-content-end">
                        <Button
                            varient="primary"
                            onClick={addProductClickHandler}
                        >
                            انتشار محصول
                            {loading && (
                                <Spinner animation="border" size="sm" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductsSection;
