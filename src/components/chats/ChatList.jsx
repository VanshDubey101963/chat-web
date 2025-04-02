import React, { useEffect, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Box,
  Avatar,
  Stack,
  List,
  IconButton,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import {
  OutlinedInput,
  InputAdornment,
  Button,
  ListItem,
  ListItemAvatar,
} from "@mui/material";
import FriendsDialog from "./dialogs/FriendsDialog";
import {
  MagnifyingGlass,
  ArchiveBox,
  FinnTheHuman,
  List as List1,
  UserPlus,
} from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { setChatNavbar } from "../../utils/redux/slices/chat/chatSlice";
import { setChatIndex } from "../../utils/redux/slices/page/pageSlice";

const ChatList = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const dispatch = useDispatch();

  const handleListItemClick = (event, props) => {
    setSelectedIndex(props.index);
    dispatch(setChatNavbar({ ...props }));
    dispatch(setChatIndex(props.index));
  };

  const { friends } = useSelector((state) => state.user);

  return (
    <Box
      sx={{
        backgroundColor: "#F8F9FF",
        width: "350px",
        borderRadius: 1.5,
        outline: "none",
        padding: 3,
      }}
    >
      <Stack spacing={2}>
        <Stack justifyContent={"space-between"} direction={"row"}>
          <h1>Chats</h1>
          <IconButton onClick={handleOpenDialog}>
            <FinnTheHuman />
          </IconButton>
        </Stack>

        <FriendsDialog open={openDialog} onClose={handleCloseDialog} />

        <OutlinedInput
          sx={{
            borderRadius: 3.5,
            height: 45,
            backgroundColor: "#E6EFFC",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "#0472F4",
              opacity: 0.75,
            },
          }}
          placeholder="Search"
          id="outlined-adornment-weight"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlass size={20} color="#0472F4" />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <List1 size={20} color="black" opacity={0.75} />
              </IconButton>
            </InputAdornment>
          }
          inputProps={{
            "aria-label": "weight",
          }}
        />

        <Button
          variant="text"
          sx={{
            p: 0.5,
            width: "fit-content",
            textTransform: "none",
            paddingLeft: 2,
          }}
          startIcon={<ArchiveBox color="black" />}
        >
          Archived
        </Button>
        <Divider component={"h1"} />
        <List>
        {friends.length == 0 && 
            <p
              style={{
                margin: "auto",
                textAlign: "center",
                fontFamily: "poppins",
                fontSize: 11.5,
              }}
            >
              Make Some Friends To Chat
            </p>
            }
          {friends.map((el) => (
            <Chats
              key={el._id}
              name={el.username}
              index={el._id}
              iconSrc={el.avatar}
              selectedIndex={selectedIndex}
              onListItemClick={handleListItemClick}
              about={"A leap of faith"}
              isOnline={el.isOnline}
            />
          ))}
        </List>
      </Stack>
    </Box>
  );
};

const Chats = (props) => {
  const index = props.index;
  const name = props.name;
  const iconSrc = props.iconSrc;
  const about = props.about;
  const selectedIndex = props.selectedIndex;
  const onListItemClick = props.onListItemClick;
  const isOnline = props.isOnline;

  return (
    <ListItemButton
      onClick={(event) =>
        onListItemClick(event, {
          username: name,
          avatar: iconSrc,
          isOnline: isOnline,
          index: index,
        })
      }
      sx={{
        borderRadius: "5px",
        gap: 2,
        backgroundColor: selectedIndex === index ? "#4F8AF5" : "white",
        marginBottom: 2,
        width: "100%",
        padding: 0,
        "&:hover": {
          backgroundColor: "#B0C9FF",
          "& .MuiListItemText-primary, & .MuiListItemText-secondary": {
            color: "white",
          },
        },
        color: selectedIndex === index ? "white" : "black",
      }}
    >
      <ListItemIcon>
        <Avatar
          alt="src/assets/man_4140048.png"
          src={iconSrc}
          sx={{ marginLeft: 1, borderRadius: "50%" }}
        />
      </ListItemIcon>
      <ListItemText
        primary={name}
        secondary={about}
        sx={{
          "& .MuiListItemText-primary": {
            fontWeight: 600,
            fontSize: 15,
          },
          "& .MuiListItemText-secondary": {
            color: selectedIndex === index ? "white" : "black",
            fontSize: 12,
          },
        }}
      />
    </ListItemButton>
  );
};

export default ChatList;

export const CallList = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const dispatch = useDispatch();

  const handleListItemClick = (event, props) => {
    setSelectedIndex(props.index);
    dispatch(setChatNavbar({ ...props }));
    dispatch(setChatIndex(props.index));
  };

  useEffect(() => {
      dispatch(setChatIndex(-1))
  }, [])

  return (
    <Box
      sx={{
        backgroundColor: "#F8F9FF",
        width: "350px",
        borderRadius: 1.5,
        outline: "none",
        padding: 3,
      }}
    >
      <Stack spacing={2}>
        <Stack justifyContent={"space-between"} direction={"row"}>
          <h1>Calls</h1>
          <IconButton onClick={handleOpenDialog} sx={{ borderRadius: "50%" }}>
            <img src="src\assets\phone-list.svg" alt="" />
          </IconButton>
        </Stack>

        <FriendsDialog open={openDialog} onClose={handleCloseDialog} />

        <OutlinedInput
          sx={{
            borderRadius: 3.5,
            height: 45,
            backgroundColor: "#E6EFFC",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "#0472F4",
              opacity: 0.75,
            },
          }}
          placeholder="Search"
          id="outlined-adornment-weight"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlass size={20} color="#0472F4" />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <List1 size={20} color="black" opacity={0.75} />
              </IconButton>
            </InputAdornment>
          }
          inputProps={{
            "aria-label": "weight",
          }}
        />
        <Divider component={"h1"} />
        <List sx={{ height: "100%" }}>
          {callData.length == 0 && (
            <p
              style={{
                margin: "auto",
                textAlign: "center",
                fontFamily: "poppins",
                fontSize: 13.5,
              }}
            >
              No Call History
            </p>
          )}
        </List>
      </Stack>
    </Box>
  );
};

export const GroupList = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const dispatch = useDispatch();

  const handleListItemClick = (event, props) => {
    setSelectedIndex(props.index);
    dispatch(setChatNavbar({ ...props }));
    dispatch(setChatIndex(props.index));
  };

  useEffect(() => {
    dispatch(setChatIndex(-1))
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#F8F9FF",
        width: "350px",
        borderRadius: 1.5,
        outline: "none",
        padding: 3,
      }}
    >
      <Stack spacing={2}>
        <Stack justifyContent={"space-between"} direction={"row"}>
          <h1>Groups</h1>
          <IconButton onClick={handleOpenDialog}>
          <UserPlus />
          </IconButton>
        </Stack>

        <FriendsDialog open={openDialog} onClose={handleCloseDialog} />

        <OutlinedInput
          sx={{
            borderRadius: 3.5,
            height: 45,
            backgroundColor: "#E6EFFC",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "#0472F4",
              opacity: 0.75,
            },
          }}
          placeholder="Search"
          id="outlined-adornment-weight"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlass size={20} color="#0472F4" />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <List1 size={20} color="black" opacity={0.75} />
              </IconButton>
            </InputAdornment>
          }
          inputProps={{
            "aria-label": "weight",
          }}
        />

        <Button
          variant="text"
          sx={{
            p: 0.5,
            width: "fit-content",
            textTransform: "none",
            paddingLeft: 2,
          }}
          startIcon={<ArchiveBox color="black" />}
        >
          Archived
        </Button>
        <Divider component={"h1"} />
        <List>
        {groupData.length == 0 && 
            <p
              style={{
                margin: "auto",
                textAlign: "center",
                fontFamily: "poppins",
                fontSize: 13.5,
              }}
            >
              No Group Found
            </p>
            }
          
        </List>
      </Stack>
    </Box>
  );
};

const callData = [];
const groupData = [];
