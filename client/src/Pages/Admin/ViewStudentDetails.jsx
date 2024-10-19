import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, addStudent, updateStudent, deleteStudent } from "../../redux/Slice/studentSlice";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const StudentList = () => {
    const dispatch = useDispatch();
    const { list, loading, error } = useSelector((state) => state.student);
    const [newStudent, setNewStudent] = useState({ name: "", age: "" });

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    const handleAddStudent = () => {
        dispatch(addStudent(newStudent));
        setNewStudent({ name: "", age: "" }); // Clear form after adding
    };

    const handleUpdateStudent = (id) => {
        dispatch(updateStudent({ id, updatedData: { name: "Updated Name", age: 20 } }));
    };

    const handleDeleteStudent = (id) => {
        dispatch(deleteStudent(id));
    };

    return (
        <Container>
            <h1 className="my-4">Student List</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <Row className="mb-4">
                <Col md={5}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    />
                </Col>
                <Col md={5}>
                    <TextField
                        label="Age"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={newStudent.age}
                        onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                    />
                </Col>
                <Col md={2}>
                    <Button variant="primary" onClick={handleAddStudent} className="w-100">
                        Add Student
                    </Button>
                </Col>
            </Row>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sl.no</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list &&
                        list
                            .map((student, index) => (
                                <tr key={student.id}>
                                    <td>{index + 1}</td> 
                                    <td>{student.name}</td>
                                    <td>{student.age}</td>
                                    <td>
                                        <IconButton color="primary" onClick={() => handleUpdateStudent(student.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => handleDeleteStudent(student.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default StudentList;
