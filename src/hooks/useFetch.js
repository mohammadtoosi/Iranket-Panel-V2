import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    const sendRequestHandlerAsync = async () => {

        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            setLoading(true);
            const response = await fetch(url, requestOptions);
            if (response.ok || response.status === 200) {
                const data = await response.json();
                setData(data);
            }
            setLoading(false);
        } catch (error) {
            setError({ error: error, message: error.message });
        }
    };

    useEffect(() => {
        sendRequestHandlerAsync();
    }, [url]);

    return {
        data,
        loading,
        error,
    };
};

export default useFetch;
