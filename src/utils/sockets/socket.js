import { io } from 'socket.io-client';

const url = import.meta.env.VITE_SERVER_URL;
let socket;

export const createConnection = (userID) => {
    socket = io(url,{
        query: {
            'userID': userID
        }
    });

    return socket;
}
