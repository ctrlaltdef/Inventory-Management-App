import { Typography } from "@mui/material";

const WelcomeUser = ({ username }) => {
  return (
    <Typography variant="h5" sx={{ color: "#C6DDF0", fontWeight:500 }}>
      Welcome, {username}
    </Typography>
  );
};

export default WelcomeUser;
