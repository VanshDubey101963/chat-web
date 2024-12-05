const url = import.meta.env.VITE_SERVER_URL;
import { toast, Bounce } from "react-toastify";

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
            ok: responseData.ok,
            message: responseData.message
        };

    } catch (error) {
        console.log(error)
    }
}
