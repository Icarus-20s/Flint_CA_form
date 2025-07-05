import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api";
import { useAuth } from "../../Context/AuthContextProvider";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import "./Login.css"; // Custom CSS for this page

const Login = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post("/login/", { email, password });
            if (response.status === 200) {
                auth.login(
                    response.data.user,
                    response.data.token,
                    response.data.role
                );
                navigate("/", { replace: true });
            }
        } catch (error) {
            setError("Login Failed. Please check your email and password.");
            console.error("Login Failed:", error);
        }
    };

    return (
        <Container maxWidth="xs" className="custom-login-container">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: 3,
                    padding: 8,
                    borderRadius: 6,
                    backgroundColor: "white",
                    transition: "box-shadow 0.3s, transform 0.3s",
                    "&:hover": {
                        boxShadow: 6,
                        transform: "translateY(-3px)",
                    },
                }}
            >
                <Typography
                    variant="h6"
                    className="custom-login-heading"
                >
                    Login
                </Typography>
                <form onSubmit={handleSubmit} className="custom-login-form">
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="custom-input"
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="custom-input"
                        variant="outlined"
                    />
                    {error && (
                        <Typography
                            color="error"
                            className="custom-error-message"
                        >
                            {error}
                        </Typography>
                    )}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        marginTop: 2,
                        backgroundColor: '#FF5E00',
                        '&:hover': {
                        backgroundColor: '#e45500',
                        },
                    }}
                    >
                    Login
                </Button>
                </form>
                <Button
                    variant="text"
                    color="secondary"
                    className="custom-home-screen-button"
                    onClick={() => navigate("/forgot")}
                    sx={{ marginTop: 2 }}
                >
                    Forgot Password?
                </Button>
                <Button
                    variant="text"
                    color="secondary"
                    className="custom-home-screen-button"
                    onClick={() => navigate("/")}
                    startIcon={<KeyboardBackspaceRoundedIcon />}
                    sx={{ marginTop: 2 }}
                >
                    Go Back To Home Screen
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
