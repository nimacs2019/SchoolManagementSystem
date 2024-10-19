import { combineReducers } from "redux";
import authReducer from "./Slice/authSlice";
import studentReducer from "./Slice/studentSlice";
import libraryReducer from "./Slice/librarySlice";
import feesReducer from "./Slice/feesSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    student: studentReducer,
    library: libraryReducer,
    fees: feesReducer,
});

export default rootReducer;
