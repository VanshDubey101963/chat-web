import Navbar from "./Navbar";
import ChatBox from "./ChatBox";
import ChatList from "./ChatList";
import { Stack, Divider } from "@mui/material";
import { useDispatch , useSelector } from "react-redux";
import { fetchCurrentUser , fetchFriendRequests, fetchUsers } from '../../utils/redux/slices/user/userSlice'
import { useEffect } from "react";

const Chat = ({ theme ,  userID }) => {

  const dispatch = useDispatch()
  const { usersStatus , requestsStatus , currentUserStatus } = useSelector((state) => state.user)

  useEffect(() => {
       dispatch(fetchUsers(userID))
       dispatch(fetchFriendRequests(userID))
       dispatch(fetchCurrentUser(userID))
       console.log(userID) 
  }, []);


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
