import {
  ChatCircleDots,
  UsersThree,
  Phone,
  Gear,
  SunDim,
  SignOut,
} from "phosphor-react";
import { Box, Stack, Avatar, IconButton, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNavbarIndex } from "../../utils/redux/slices/page/pageSlice";

const Navbar = () => {
  const { avatar } = useSelector((state) => state.user);
  const { navbarIndex } = useSelector((state) => state.page);
  const dispatch = useDispatch();

  const NavbarIcons = [
    {
      index: 0,
      icon: (
        <ChatCircleDots
          height={25}
          width={25}
          color={navbarIndex == 0 ? "white" : "black"}
        />
      ),
    },

    {
      index: 1,
      icon: (
        <UsersThree
          height={25}
          width={25}
          color={navbarIndex == 1 ? "white" : "black"}
        />
      ),
    },

    {
      index: 2,
      icon: (
        <Phone
          height={25}
          width={25}
          color={navbarIndex == 2 ? "white" : "black"}
        />
      ),
    },
  ];

  const logoutUser = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleNavbarIconsClick = (index) => () => {
    dispatch(setNavbarIndex(index));
  };

  return (
    <Box
      p={2}
      sx={{
        backgroundColor: "#EEF3FA",
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        width: 60,
        borderRadius: 1.5,
      }}
    >
      <Stack
        direction={"column"}
        height={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack
          gap={3}
          sx={{
            width: "100%",
          }}
        >
          <Avatar
            alt=""
            src="src/assets/app-icon.png"
            sx={{ backgroundColor: "#0572F4", p: 1 }}
          />
          {NavbarIcons.map((el) => (
            <button
              key={el.index}
              style={{
                backgroundColor:
                  navbarIndex == el.index ? "#0572F4" : "#EEF3FA",
                width: "100%",
                height: 50,
                borderRadius: "10px",
                border: "none",
              }}
              onClick={handleNavbarIconsClick(el.index)}
            >
              {el.icon}
            </button>
          ))}
          <Divider variant="middle" flexItem />
          <IconButton>
            <Gear />
          </IconButton>
        </Stack>

        <Stack direction={"column"} alignItems={"center"} gap={3}>
          <IconButton>
            <SunDim />
          </IconButton>
          <IconButton>
            <Avatar alt="" src={avatar} sx={{ width: 30, height: 30 }} />
          </IconButton>
          <IconButton onClick={logoutUser}>
            <SignOut />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Navbar;
