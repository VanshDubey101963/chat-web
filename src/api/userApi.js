const url = import.meta.env.VITE_SERVER_URL;
import { toastError } from "../utils/toasts/toast";

export const registerUser = async (data) => {

    try {
        const response = await fetch(`${url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: data
            })
        })

        const responseData = await response.json();
        return {
            ok: response.ok,
            message: responseData.message
        };

    } catch (error) {
    }
}

export const loginUser = async (data) => {

    try {
        const response = await fetch(`${url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: data
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            toastError(responseData.message);
            return false;
        }

        localStorage.setItem('token', responseData.token);
        return true;

    } catch (error) {

    }
}

export const isUser = async () => {

    const token = localStorage.getItem('token');

    if (!token) return;

    try {
        const response = await fetch(`${url}/signin/protectedData`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        return {
            ok: response.ok,
            userID: data.userID
        };

    } catch (error) {

    }
}