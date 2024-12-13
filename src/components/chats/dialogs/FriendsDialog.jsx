import React, { useState } from "react";
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

const FriendsDialog = ({ open, onClose }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [search, setSearch] = useState("");

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  const handleSearchChange = (event) => setSearch(event.target.value);

  const exploreUsers = [
    { id: 1, name: "JohnDoe" },
    { id: 2, name: "Jane Smith" },
    { id: 3 , name: "Bran smith"},
    { id: 3 , name: "Bran smith"},
    { id: 3 , name: "Bran smith"},
    { id: 3 , name: "Bran smith"}
  ];
  const friendRequests = [
    { id: 3, name: "Emily Johnson" },
    { id: 4, name: "Michael Brown" },
  ];

  const filteredExploreUsers = exploreUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
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
          <List sx={{overflow: "auto" , maxHeight: 200}}>
            {filteredExploreUsers.map((user) => (
              <ListItem key={user.id}>
                <ListItemText primary={user.name} />
                <Button variant="contained" color="primary">
                  Add Friend
                </Button>
              </ListItem>
            ))}
          </List>
        )}
        {tabIndex === 1 && (
          <List sx={{overflow: "auto", maxHeight: 200}}>
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
