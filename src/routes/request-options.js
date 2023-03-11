export const requestOptions = (method) => {
    return {
        method: method,
    };
};

export const requestOptionsWithBody = async (method, url) => {
    const options = {
        method: method,
    };
    try {
        const response = await fetch(url, options);
        if (response.ok || response.status === 200) {
            const data = await response.json();

            return { res: response, data: data };
        }
    } catch (error) {
        console.log(error);
    }
};

export const postRequestOptions = async (url, body) => {
    const options = {
        method: "POST",
        body: JSON.stringify(body),
    };
    try {
        const response = await fetch(url, options);
        if (response.ok || response.status === 200) {
            const data = await response.json();

            return data;
        }
    } catch (error) {
        console.log(error);
    }
};
