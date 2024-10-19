import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, logoutUser, registerUser } from "../redux/Slice/authSlice";

const LoginForm = ({ heading, showRegister, role }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        class: "",
        address: "",
        username: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

    const handleToggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        try {
            const resultAction = await dispatch(
                loginUser({
                    email: formData.email,
                    password: formData.password,
                    role,
                })
            );
            if (loginUser.fulfilled.match(resultAction)) {
                const { token, role } = resultAction.payload;
                localStorage.setItem("authToken", token);
                navigate(`/${role}/admin-dashboard`);
                toast.success("Login successful!");
            } else {
                toast.error("Login failed! Please check your credentials.");
            }
        } catch (error) {
            toast.error("An error occurred during registration.");
        }
    };

    const handleRegister = async () => {
        const registrationData = {
            ...formData,
            role,
        };

        try {
            const resultAction = await dispatch(registerUser(registrationData));
            if (registerUser.fulfilled.match(resultAction)) {
                toast.success("Registration successful! You can now log in.");
                setIsRegistering(false);
            } else {
                toast.error("Registration failed! Please check your details.");
            }
        } catch (error) {
            toast.error("An error occurred during registration."); // Add error handling message
        }
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("authToken");
        navigate("/login");
        toast.info("You have logged out successfully.");
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Box
                sx={{
                    border: "1px solid #4caf50",
                    borderRadius: "16px",
                    width: "500px",
                    padding: "2rem",
                    textAlign: "center",
                }}
            >
                <h2>{isRegistering ? "Register" : heading} Login</h2>

                {isRegistering ? (
                    <>
                        <TextField
                            label="Name"
                            name="name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Class"
                            name="class"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.class}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Address"
                            name="address"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Username"
                            name="username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        <Button variant="success" className="mt-3" block onClick={handleRegister}>
                            Register
                        </Button>
                        <p>
                            Already have an account?{" "}
                            <span
                                onClick={() => {
                                    handleToggleForm();
                                }}
                                style={{ cursor: "pointer", color: "blue" }}
                            >
                                Login
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <TextField
                            label="Email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <Button variant="success" className="mt-3" block onClick={handleLogin}>
                            Login
                        </Button>
                        {showRegister && (
                            <p>
                                Are you new?{" "}
                                <span onClick={handleToggleForm} style={{ cursor: "pointer", color: "blue" }}>
                                    Register
                                </span>
                            </p>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
};

function Login() {
    const { role } = useParams();

    const roleConfig = {
        admin: { heading: "Admin", showRegister: false },
        staff: { heading: "Staff", showRegister: false },
        librarian: { heading: "Librarian", showRegister: false },
        student: { heading: "Student", showRegister: true },
    };

    const config = roleConfig[role];

    return (
        <div>
            {config ? (
                <LoginForm heading={config.heading} showRegister={config.showRegister} role={role} />
            ) : (
                <h2>Invalid Role</h2>
            )}
        </div>
    );
}

export default Login;
