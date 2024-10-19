import React, { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { AppBar, Toolbar, Typography, Button, Box, TextField, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const [announcement, setAnnouncement] = useState("");
    const [postedAnnouncement, setPostedAnnouncement] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar
    const [showStudentSubtitles, setShowStudentSubtitles] = useState(false); // State to show/hide student subtitles

    // Handle announcement submission
    const handlePostAnnouncement = () => {
        if (announcement.trim() === "") {
            alert("Announcement cannot be empty!");
            return;
        }
        setPostedAnnouncement(announcement); // Store the announcement
        setAnnouncement(""); // Clear the text area after posting
    };

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Toggle student subtitles visibility
    const toggleStudentSubtitles = () => {
        setShowStudentSubtitles(!showStudentSubtitles);
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            {isSidebarOpen && (
                <Box sx={{ width: "250px", backgroundColor: "#f8f9fa", padding: "15px" }}>
                    <h4>Admin Dashboard</h4>
                    <Nav className="flex-column">
                        <Nav.Link href="#">Dashboard</Nav.Link>
                        <Nav.Link onClick={toggleStudentSubtitles}>Students {showStudentSubtitles ? "▲" : "▼"}</Nav.Link>
                        {showStudentSubtitles && (
                            <Nav className="flex-column" style={{ paddingLeft: "20px" }}>
                                <Nav.Link as={Link} to="/students-lists">
                                    View Student Details
                                </Nav.Link>{" "}
                                <Nav.Link href="#">View Fees</Nav.Link>
                                <Nav.Link href="#">Library Records</Nav.Link>
                            </Nav>
                        )}
                        <Nav.Link href="#">Logout</Nav.Link>
                    </Nav>
                </Box>
            )}

            {/* Main Content */}
            <div style={{ flex: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={toggleSidebar} aria-label="menu">
                            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Admin Dashboard
                        </Typography>
                        <Button color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>

                {/* Announcement Section */}
                <Container fluid className="p-4">
                    <Row>
                        <Col>
                            <Typography variant="h5" gutterBottom>
                                Post a Common Announcement
                            </Typography>

                            {/* Text Area for Announcement */}
                            <TextField
                                multiline
                                rows={5}
                                variant="outlined"
                                fullWidth
                                value={announcement}
                                onChange={(e) => setAnnouncement(e.target.value)}
                                placeholder="Write your announcement here..."
                                sx={{ marginBottom: "20px" }}
                            />

                            {/* Post Announcement Button */}
                            <Button variant="contained" color="primary" onClick={handlePostAnnouncement}>
                                Post Announcement
                            </Button>

                            {/* Display the Posted Announcement */}
                            {postedAnnouncement && (
                                <Box
                                    sx={{
                                        marginTop: "30px",
                                        padding: "20px",
                                        backgroundColor: "#e0f7fa",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <Typography variant="h6">Latest Announcement:</Typography>
                                    <Typography variant="body1">{postedAnnouncement}</Typography>
                                </Box>
                            )}
                        </Col>
                    </Row>
                </Container>

                {/* Footer */}
                <footer
                    style={{
                        textAlign: "center",
                        padding: "10px",
                        backgroundColor: "#f8f9fa",
                        marginTop: "auto",
                    }}
                >
                    <Typography variant="body2">© 2024 Admin Dashboard</Typography>
                </footer>
            </div>
        </div>
    );
};

export default AdminDashboard;
