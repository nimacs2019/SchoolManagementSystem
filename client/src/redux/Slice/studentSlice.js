import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from '../../services/studentService' 

// Fetch students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, thunkAPI) => {
    try {
      const response = await studentService.getAllStudents();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add a new student
export const addStudent = createAsyncThunk("students/addStudent", async (studentData, thunkAPI) => {
    try {
        const response = await studentService.addStudent(studentData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Update an existing student
export const updateStudent = createAsyncThunk("students/updateStudent", async ({ id, updatedData }, thunkAPI) => {
    try {
        const response = await studentService.updateStudent(id, updatedData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Delete a student
export const deleteStudent = createAsyncThunk("students/deleteStudent", async (id, thunkAPI) => {
    try {
        await studentService.deleteStudent(id);
        return id; // Return the deleted student's ID to update the state
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const studentSlice = createSlice({
    name: "students",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // Fetch students
            .addCase(fetchStudents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add student
            .addCase(addStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update student
            .addCase(updateStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((student) => student.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete student
            .addCase(deleteStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((student) => student.id !== action.payload);
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default studentSlice.reducer;
