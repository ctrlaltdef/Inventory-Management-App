"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Link,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Define the theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#996888",
    },
    secondary: {
      main: "#c6ddf0",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
      router.push("/homepage");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2a2b2a",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "linear-gradient(135deg, #2a2b2a, #5e4955, #996888)",
              padding: 3,
              borderRadius: 2,
              boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.3)",
            }}
            component={motion.div}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: "#c6ddf0" }}>
              Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#c99da3",
                          },
                          "&:hover fieldset": {
                            borderColor: "#996888",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#c6ddf0",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#c6ddf0",
                        },
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                      }}
                    />
                  </motion.div>
                </Grid>
                <Grid item xs={12}>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#c99da3",
                          },
                          "&:hover fieldset": {
                            borderColor: "#996888",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#c6ddf0",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#c6ddf0",
                        },
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                      }}
                    />
                  </motion.div>
                </Grid>
              </Grid>
              {error && <Typography color="error">{error.message}</Typography>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: "#996888",
                  color: "#c6ddf0",
                  "&:hover": {
                    background: "#5e4955",
                  },
                  boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.2)",
                }}
                disabled={loading}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="/sign-up"
                    variant="body2"
                    sx={{ color: "#c6ddf0" }}
                  >
                   Don&apos;t have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default SignIn;
 