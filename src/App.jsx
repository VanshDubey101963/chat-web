import { useTheme } from "@mui/material/styles";
import Login from "./components/Login";
import Chat from "./components/chats/Chat";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isUser } from "./api/userApi";
import { useEffect, useState } from "react";
import { setPage } from "./utils/redux/slices/page/pageSlice";
import { setCurrentUserID } from "./utils/redux/slices/user/userSlice";
import { SocketProvider } from "./utils/sockets/socket"

function App() {
  const theme = useTheme();
  const page = useSelector((state) => state.page.currPage);
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.userID)

  async function getPage() {
    const user = await isUser();
    if (user?.ok) {
      dispatch(setPage("chat"));
      dispatch(setCurrentUserID(user.userID._id[0]._id));
    }
  }

  useEffect( () => {
      getPage()
    }, []);

  switch (page) {
    case "chat":
      return ( 
        <SocketProvider userID={userID} >
            <Chat theme={theme} userID={userID} />
        </SocketProvider>
    );
    default:
      return <Login />;
  }
}

export default App;
