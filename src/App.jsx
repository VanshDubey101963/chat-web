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
    console.log("Redux state changed1:", { userID, currentUserIDStatus });
    if (currentUserIDStatus == "idle" && !userID ) {
      dispatch(fetchCurrentUserID());
    }
    console.log("Redux state changed2:", { userID, currentUserIDStatus });
  }, [currentUserIDStatus]);

  if (currentUserIDStatus === "pending") return <p>Loading...</p>;

  if (userID) {
    return (
      <SocketProvider userID={userID}>
        <Chat theme={theme} />
      </SocketProvider>
    );
  }

  return <Login />;
}

export default App;
