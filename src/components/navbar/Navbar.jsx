import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import auth from "../../routes/auth";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const Navbar = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const logoutClickHandler = async () => {
        setLoading(true);
        try {
            const response = await axios.get(auth.logout, {
                withCredentials: true,
            });
            navigate("/");
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        sessionStorage.removeItem("is_a");
        navigate("/");
        window.location.reload();
        setLoading(false);
    };

    return (
        <nav className="shadow-md p-3 bg-white">
            <header className="d-flex">
                <div>
                    <p className="h3 mx-4">ایرانکت</p>
                </div>
                <div className="position-absolute start-0 mx-3">
                    <Button
                        onClick={logoutClickHandler}
                        variant="outline-danger"
                    >
                        {loading && (
                            <Spinner
                                animation="border"
                                size="sm"
                                variant="danger"
                            />
                        )}
                        {loading ? "" : "خروج"}
                    </Button>
                </div>
            </header>
        </nav>
    );
};

export default Navbar;
