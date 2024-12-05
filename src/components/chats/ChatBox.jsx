import {
  Stack,
  Box,
  Avatar,
  Typography,
  IconButton,
  Badge,
  styled,
  Divider,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import {
  DotsThreeVertical,
  Paperclip,
  PaperPlaneRight,
  Phone,
  VideoCamera,
} from "phosphor-react";

const OnlineBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700", // Green color
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`, // White border
    width: 8,
    height: 8,
    borderRadius: "50%",
    bottom: 3,
    right: 3,
  },
}));

const ChatBox = () => {
  return (
    <Stack direction={"column"} sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          height: "5vh",
          backgroundColor: "#FFFFFF",
          borderRadius: 1.5,
          paddingLeft: 3,
          paddingTop: 2,
        }}
      >
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} gap={2}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <OnlineBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar
                  src={faker.image.avatar}
                  alt="Avatar"
                  sx={{ width: 35, height: 35 }}
                />
              </OnlineBadge>
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack direction={"column"} gap={1 / 2}>
                <Typography variant="body" component={"h4"}>
                  Example Chat
                </Typography>
                <Typography
                  variant="subtitle"
                  component={"h5"}
                  sx={{ color: "grey" }}
                >
                  Online
                </Typography>
              </Stack>
            </Box>
          </Stack>

          <Stack direction={"row"} gap={2} paddingRight={5}>
            <IconButton>
              <Phone />
            </IconButton>
            <IconButton>
              <VideoCamera />
            </IconButton>
            <IconButton>
              <DotsThreeVertical />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          height: "95vh",
          width: "100%",
          backgroundColor: "#F8F9FF",
          position: "relative",
        }}
      >
        <Box sx={{ height: "98%" }}></Box>
        <Divider sx={{ backgroundColor: "black" }} />
        <Stack
          direction={"row"}
          gap={1}
          sx={{
            position: "absolute",
            bottom: 0,
            paddingTop: 1,
            paddingRight: 1,
            paddingLeft: 1,
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#E6EFFC",
              borderRadius: "10px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              paddingRight: 2,
            }}
          >
            <IconButton>
              <Paperclip />
            </IconButton>
            <textarea
              placeholder="Write a message..."
              style={{
                height: "31px",
                resize: "both",
                overflow: "auto",
                border: "none",
                outline: "none",
                backgroundColor: "#E6EFFC",
                width: "93%",
                flex: 1,
                lineHeight: "31px",
              }}
            ></textarea>
            <IconButton>
              <PaperPlaneRight />
            </IconButton>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ChatBox;
