import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import applyReducer from "./slices/applySlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer:{
        auth: authReducer,
        admin: adminReducer,
        applyService: applyReducer
    }
})