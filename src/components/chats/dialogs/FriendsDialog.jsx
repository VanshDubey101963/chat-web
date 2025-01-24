import React, { useState, useEffect, useRef, useContext } from "react";
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
  const [isLoading, setLoading] = useState(false);
  const { friendRequests , users } = useSelector((state) => state.user)
  const handleTabChange = (event, newValue) => setTabIndex(newValue);
  const handleSearchChange = (event) => setSearch(event.target.value);

 
  const filteredExploreUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );
  const filteredFriendRequests = friendRequests.filter((request) =>
    request.name.toLowerCase().includes(search.toLowerCase())
  );


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
          <List
            sx={{ overflow: "auto", maxHeight: 200 }}
          >
            {filteredExploreUsers.map((user) => (
              <ListItem key={user._id}>
                <ListItemText primary={user.username} />
                <Button variant="contained" color="primary">
                  Add Friend
                </Button>
              </ListItem>
            ))}
            {isLoading && <p>loading ....</p>}
          </List>
        )}
        {tabIndex === 1 && (
          <List sx={{ overflow: "auto", maxHeight: 200 }}>
            {filteredFriendRequests.map((request) => (
              <ListItem key={request.id}>
                <ListItemText primary={request.name} />
                <Button variant="contained" color="success">
                  Accept
                </Button>
                <Button variant="outlined" color="error" sx={{ ml: 1 }}>
                  Decline
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Dialog>
  );
};

export default FriendsDialog;
