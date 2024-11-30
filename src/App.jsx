import { useTheme } from "@mui/material/styles";
import { Divider, Stack } from "@mui/material";
import { ChatList } from "./components/ChatList";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import ChatBox from "./components/ChatBox";

function App() {
  const theme = useTheme();

  return (
    <>
      <Login />
    </>
  );
}

const Chat =  () => {
  return(
    <Stack direction={'row'} height={'98vh'} width={'98vw'} gap={0.1}>
        <Navbar/>
        <ChatList theme={theme}/>
        <Divider sx={{bgcolor: '#767B82'}} />
        <ChatBox/>
      </Stack>
  )
}

export default App;
