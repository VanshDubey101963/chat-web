import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  Tabs,
  Tab,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../utils/sockets/socket";

const FriendsDialog = ({ open, onClose }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [search, setSearch] = useState("");
  const { friendRequests, users, userID, currentUserIDStatus } = useSelector(
    (state) => state.user
  );
  const handleTabChange = (event , newValue) => setTabIndex(newValue);
  const handleSearchChange = (event) => setSearch(event.target.value);

  const filteredExploreUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );
  const filteredFriendRequests = friendRequests?.filter((request) =>
    request?.sender.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddFriend = (otherUserID) => () => {
    socket.emit("friend_request", {
      to: otherUserID,
      from: userID,
    });
  };

  const handleAcceptedRequest = (otherUserID) => () => {
    socket.emit("request_accepted", {
      to: userID,
      from: otherUserID,
    });
  };

  const handleAcceptedRejected = (otherUserID) => () => {
    socket.emit("request_rejected", {
      to: userID,
      from: otherUserID,
    });
  };

  const socket = useContext(SocketContext);

  if (currentUserIDStatus == "pending") return <p> loading..... </p>;
  if (currentUserIDStatus == "fulfilled") {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Friends</DialogTitle>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Explore" />
          <Tab label="Friend Requests" />
        </Tabs>
        <Box p={2}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={search}
            onChange={handleSearchChange}
          />
          {tabIndex === 0 && (
            <List sx={{ overflow: "auto", maxHeight: 200 }}>
              {filteredExploreUsers.map((user) => (
                <ListItem key={user._id}>
                  <ListItemText primary={user.username} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddFriend(user._id)}
                  >
                    Add Friend
                  </Button>
                </ListItem>
              ))}
            </List>
          )}
          {tabIndex === 1 && (
            <List sx={{ overflow: "auto", maxHeight: 200 }}>
              {filteredFriendRequests.map((request) => (
                <ListItem key={request._id}>
                  <ListItemText primary={request.sender.username} />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleAcceptedRequest(request.sender._id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ ml: 1 }}
                    onClick={handleAcceptedRejected(request.recipient._id)}
                  >
                    Decline
                  </Button>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Dialog>
    );
  }
};

export default FriendsDialog;
