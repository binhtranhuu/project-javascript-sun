import axios from "axios";
import { apiUrl } from "./config";

export const getProducts = async ({ page, category }) => {
    const query = `?_limit=6&${page && `_page=${page}`}&${
        category && `category=${category}`
    }`;

    try {
        const response = await axios({
            url: `${apiUrl}/products/${query}`,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.statusText !== "OK") {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
};

export const getCategories = async () => {
    try {
        const response = await axios({
            url: `${apiUrl}/categories`,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.statusText !== "OK") {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
};

export const getProduct = async (id) => {
    try {
        const response = await axios({
            url: `${apiUrl}/products/${id}`,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.statusText !== "OK") {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
};

export const createOrder = async (order) => {
    try {
        const response = await axios({
            url: `${apiUrl}/orders`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: order,
        });
        if (response.statusText !== "OK") {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return {
            error: err.response ? err.response.data.message : err.message,
        };
    }
};
