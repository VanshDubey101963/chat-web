import { useTheme } from "@mui/material/styles";
import Login from "./components/Login";
import Chat from "./components/chats/Chat";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isUser } from "./api/userApi";
import { useEffect } from "react";
import { setPage } from "./redux/slices/page/pageSlice";

function App() {
  const theme = useTheme();
  const page = useSelector((state) => state.page.currPage);
  const dispatch = useDispatch();

  async function getPage() { 
    const user = await isUser();
    if(user.ok)
      {
        dispatch(setPage('chat'))
      }
  }

  useEffect(() => {
    getPage();
  }, []);

  switch (page) {
    case "chat":
      return <Chat theme={theme} />;
    default:
      return <Login />;
  }
}

export default App;
