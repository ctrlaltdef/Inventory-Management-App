import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import WelcomeUser from "./WelcomeUser";

export default function AppBarComponent({ handleDrawerOpen }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage: "linear-gradient(301deg, #2a2b2a 0%, #5e4955 30%, #c99da3 65%, #996888 100%)",
        color: "text.primary",
        width: "100%",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <WelcomeUser username="Yusra" />
          </Box>
          <Button
            color="inherit"
            variant="outlined"
            sx={{
              fontFamily: "sans-serif",
              fontWeight: "550",
              bgcolor: "background.paper",
              color: "text.primary",
              display: 'flex',
              alignItems: 'center',
              padding: '6px 12px',
              borderRadius: '20px',
              borderColor: 'transparent',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              '&:hover': {
                backgroundColor: '#996888',
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => {
              signOut(auth);
              sessionStorage.removeItem("user");
            }}
          >
            <Logout sx={{ mr: 1 }} />
            Log Out
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
