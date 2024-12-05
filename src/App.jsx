import { useTheme } from "@mui/material/styles";
import Login from "./components/Login";
import Chat from "./components/chats/Chat";
import { useSelector } from "react-redux";

function App() {
  const theme = useTheme();
  const page = useSelector((state) => state.page.currPage);

  switch (page) {
    case "chat":
      return <Chat theme={theme} />;
    default:
      return <Login />;
  }
}

export default App;
