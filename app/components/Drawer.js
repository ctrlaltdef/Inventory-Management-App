import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function DrawerComponent({ drawerOpen, handleDrawerClose, handleAddProductOpen }) {
  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={handleDrawerClose}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#1e1e1e",
          color: "#fff",
        },
      }}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={handleDrawerClose}
        onKeyDown={handleDrawerClose}
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={handleAddProductOpen}>
            <ListItemIcon>
              <AddIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Add Product" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
