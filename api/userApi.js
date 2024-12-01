const url = import.meta.env.VITE_SERVER_URL;

export const registerUser = async (data) => {
    console.log(url);
    const response = await fetch(`${url}/signup`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: data
        })
    })
}
