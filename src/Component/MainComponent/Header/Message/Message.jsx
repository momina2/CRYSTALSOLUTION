import React from "react";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Button,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "../../../../ThemeContext";
import { useNavigate } from "react-router-dom";

const MessagePopup = ({ isOpen }) => {
  const navigate = useNavigate();
  const { getcolor, fontcolor } = useTheme();
  const messagesData = [
    {
      title: "Subtain",
      time: "9:10 PM",
      message: "Just a reminder of the event.",
      icon: <EventAvailableIcon />,
      avatarColor: "#FF5722",
    },
    {
      title: "Hamza",
      time: "9:02 AM",
      message: "Just send my admin!",
      icon: <EmailIcon />,
      avatarColor: "#2196F3",
    },
    {
      title: "Ahmed",
      time: "9:02 AM",
      message: "Just check emails for today.",
      icon: <EmailIcon />,
      avatarColor: "#4CAF50",
    },
    {
      title: "Numan",
      time: "9:08 AM",
      message: "You can customize this template as you...",
      icon: <SettingsIcon />,
      avatarColor: "#FF9800",
    },
    {
      title: "Saif",
      time: "9:02 AM",
      message: "Just send my admin!",
      icon: <EmailIcon />,
      avatarColor: "#9C27B0",
    },
  ];

  const PopupContainer = styled(Paper)(({ theme }) => ({
    position: "absolute",
    top: "60px",
    right: "20px",
    width: "300px",
    borderRadius: "12px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
    zIndex: 10,
    padding: "20px",
    background: theme.palette.background.paper,
    transition: "0.3s ease-in-out",
  }));

  const Header = styled(Typography)({
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "20px",
    paddingBottom: "6px",
    color: fontcolor,
  });
  return (
    isOpen && (
      <PopupContainer sx={{ backgroundColor: getcolor, color: fontcolor }}>
        <Header variant="h6">Messages</Header>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", marginBottom: "6px", color: fontcolor }}
        >
          You have {messagesData.length} new messages
        </Typography>
        <List sx={{ maxHeight: "320px", overflowY: "auto" }}>
          {messagesData.map((msg, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  borderRadius: "10px",
                  padding: "2px 4px",
                  transition: "0.3s",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{ backgroundColor: msg.avatarColor, fontSize: "12px" }}
                  >
                    {msg.title[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      style={{ color: fontcolor }}
                    >
                      {msg.time} - {msg.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body3"
                      color="text.secondary"
                      style={{ color: fontcolor }}
                    >
                      {msg.message}
                    </Typography>
                  }
                />
                <IconButton sx={{ color: fontcolor }}>{msg.icon}</IconButton>
              </ListItem>
              {index < messagesData.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        <Box textAlign="center" marginTop="6px">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              fontWeight: "bold",
              borderRadius: "10px",
              textTransform: "none",
              fontSize: "13px",
              padding: "10px 0",
              transition: "0.3s",
              "&:hover": { backgroundColor: "#004085" },
            }}
            onClick={() => navigate("/MessageScreen")}
          >
            Check All Messages
          </Button>
        </Box>
      </PopupContainer>
    )
  );
};

export default MessagePopup;
