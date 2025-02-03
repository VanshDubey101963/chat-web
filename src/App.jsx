import { useTheme } from "@mui/material/styles";
import Login from "./components/Login";
import Chat from "./components/chats/Chat";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchCurrentUserID,
  setCurrentUserID,
} from "./utils/redux/slices/user/userSlice";
import { SocketProvider } from "./utils/sockets/socket";

function App() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { userID, currentUserIDStatus } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userID && currentUserIDStatus == "idle") {
      dispatch(fetchCurrentUserID());
    }
  }, [currentUserIDStatus]);

  if (!userID) return <Login />;
  if (currentUserIDStatus === "pending") return <p>loading.....</p>;
  if (currentUserIDStatus === "fulfilled")
    return (
      <SocketProvider userID={userID}>
        <Chat theme={theme} />
      </SocketProvider>
    );
}

export default App;
