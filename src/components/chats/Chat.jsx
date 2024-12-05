import Navbar from "./Navbar";
import ChatBox from "./ChatBox";
import ChatList from "./ChatList";
import { Stack, Divider } from "@mui/material";

const Chat = ({ theme }) => {
  return (
    <Stack direction={"row"} height={"98vh"} width={"98vw"} gap={0.1}>
      <Navbar />
      <ChatList theme={theme} />
      <Divider sx={{ bgcolor: "#767B82" }} />
      <ChatBox />
    </Stack>
  );
};

export default Chat;
