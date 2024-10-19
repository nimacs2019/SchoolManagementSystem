import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const SelectRole = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    const handleLogin = () => {
        if (selectedRole) {
            navigate(`/login/${selectedRole.toLowerCase()}`);
        } else {
            alert("Please select a role before logging in.");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Box
                sx={{
                    border: "1px solid #4caf50",
                    borderRadius: "16px",
                    width: "600px",
                    padding: "2rem",
                    textAlign: "center",
                }}
            >
                <h2 className="mb-4">Select Role</h2>
                <Button
                    variant={selectedRole === "Admin" ? "success" : "outline-success"}
                    className="mb-2 mx-2"
                    onClick={() => handleRoleSelect("Admin")}
                >
                    Admin
                </Button>
                <Button
                    variant={selectedRole === "Staff" ? "success" : "outline-success"}
                    className="mb-2 mx-2"
                    onClick={() => handleRoleSelect("Staff")}
                >
                    Staff
                </Button>
                <Button
                    variant={selectedRole === "Librarian" ? "success" : "outline-success"}
                    className="mb-2 mx-2"
                    onClick={() => handleRoleSelect("Librarian")}
                >
                    Librarian
                </Button>
                <Button
                    variant={selectedRole === "Student" ? "success" : "outline-success"}
                    className="mb-2 mx-2"
                    onClick={() => handleRoleSelect("Student")}
                >
                    Student
                </Button>
                <Row>
                    <Button variant="success" className="mt-5" onClick={handleLogin} block>
                        Login
                    </Button>
                </Row>
            </Box>
        </Container>
    );
};

export default SelectRole;
