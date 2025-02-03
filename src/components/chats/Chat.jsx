import Navbar from "./Navbar";
import ChatBox from "./ChatBox";
import ChatList from "./ChatList";
import { Stack, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentUser,
  fetchFriendRequests,
  fetchUsers,
  setOfflineFriend,
  setOnlineFriend,
} from "../../utils/redux/slices/user/userSlice";
import { useEffect, useContext } from "react";
import { SocketContext } from "../../utils/sockets/socket";
import { toastSuccess } from "../../utils/toasts/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setSelectedChatNavbarIsOnline } from "../../utils/redux/slices/chat/chatSlice";

const Chat = ({ theme }) => {
  const dispatch = useDispatch();
  const { userID, currentUserStatus, usersStatus } = useSelector(
    (state) => state.user
  );
  const { chatIndex } = useSelector((state) => state.page);

  useEffect(() => {
    dispatch(fetchCurrentUser(userID));
    dispatch(fetchUsers(userID));
    dispatch(fetchFriendRequests(userID));
  }, []);

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    const handleFriendRequest = (data) => {
      toastSuccess(data.message);
      dispatch(fetchFriendRequests(userID));
    };

    const handleNewFriendRequest = (data) => {
      toastSuccess(`New Friend Request From ${data.from}`);
      dispatch(fetchFriendRequests(userID));
    };

    const handleFriendRejected = (data) => {
      dispatch(fetchCurrentUser(userID));
      dispatch(fetchFriendRequests(userID));
    };

    const handleFriendsNow = (data) => {
      dispatch(fetchCurrentUser(userID));
      dispatch(fetchFriendRequests(userID));
    };

    const handleDisconnect = () => {};

    const handleOnlineFriend = (data) => {
      dispatch(setOnlineFriend({ ...data }));
      console.log("dispatch online called");
      dispatch(
        setSelectedChatNavbarIsOnline({ _id: data._id, isOnline: true })
      );
    };

    const handleOfflineFriend = (data) => {
      dispatch(setOfflineFriend({ ...data }));
      console.log("dispatch offline called");
      dispatch(
        setSelectedChatNavbarIsOnline({ _id: data._id, isOnline: false })
      );
    };

    socket.on("new_friend_request", handleNewFriendRequest);
    socket.on("sent_friend_request", handleFriendRequest);
    socket.on("disconnect", handleDisconnect);
    socket.on("friends_now", handleFriendsNow);
    socket.on("friends_rejected", handleFriendRejected);
    socket.on("is_online", handleOnlineFriend);
    socket.on("is_offline", handleOfflineFriend);

    return () => {
      socket.off("sent_friend_request", handleFriendRequest);
      socket.off("disconnect", handleDisconnect);
      socket.off("new_friend_request", handleNewFriendRequest);
      socket.on("friends_now", handleFriendsNow);
      socket.on("friends_rejected", handleFriendRejected);
      socket.on("is_online", handleOnlineFriend);
      socket.on("is_offline", handleOfflineFriend);
    };
  }, [socket]);

  if (currentUserStatus == "fulfilled" && usersStatus == "fulfilled") {
    return (
      <Stack direction={"row"} height={"98vh"} width={"98vw"} gap={0.1}>
        <ToastContainer />
        <Navbar />
        <ChatList theme={theme} />
        <Divider sx={{ bgcolor: "#767B82" }} />
        {chatIndex != -1 && <ChatBox />}
        {chatIndex == -1 && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
            }}
          >
            <img src="src\assets\illustration.png" height={400} width={400} />
            <p
              color="#2C3E50"
              style={{
                fontFamily: "Merriweather",
                fontWeight: 550,
              }}
            >
              Feeling social? Start a new conversation.
            </p>
          </div>
        )}
      </Stack>
    );
  }
};

export default Chat;
