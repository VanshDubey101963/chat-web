import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box, Avatar, Stack, List, IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import { OutlinedInput, InputAdornment, Button } from "@mui/material";
import {
  MagnifyingGlass,
  ArchiveBox,
  FinnTheHuman,
  List as List1,
} from "phosphor-react";

const ChatList = () => {
  const [selectedIndex, setSelectedIndex] = React.useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F8F9FF",
        width: 350,
        borderRadius: 1.5,
        outline: "none",
        padding: 3,
      }}
    >
      <Stack spacing={2}>
        <Stack justifyContent={"space-between"} direction={"row"}>
          <h1>Chats</h1>
          <IconButton>
            <FinnTheHuman />
          </IconButton>
        </Stack>

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
          {ChatData.map((el) => (
            <Chats
              key={el.index}
              name={el.name}
              index={el.index}
              iconSrc={el.iconSrc}
              selectedIndex={selectedIndex}
              onListItemClick={handleListItemClick}
              about={el.about}
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

  return (
    <ListItemButton
      onClick={(event) => onListItemClick(event, index)}
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
        <Avatar alt="" src={iconSrc} sx={{ p: 1 }} />
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

const ChatData = [
  {
    index: 0,
    name: "Vansh Dubey",
    iconSrc: "src/assets/man_4140048.png",
    about: "Otaku in disguise",
  },
  {
    index: 1,
    name: "Viral Jain",
    iconSrc: "src/assets/man_4140048.png",
    about: "",
  },
  {
    index: 2,
    name: "Sanyam Bhandari",
    iconSrc: "src/assets/man_4140048.png",
    about: `for this road's mine, and mine alone..`,
  },
  {
    index: 3,
    name: "Samar Kumar Mandloi",
    iconSrc: "src/assets/man_4140048.png",
    about: "Samar Mandloi",
  },
  {
    index: 4,
    name: "Yug Shrivastava",
    iconSrc: "src/assets/man_4140048.png",
    about: "A leap of faith",
  },
];

export { ChatList };
