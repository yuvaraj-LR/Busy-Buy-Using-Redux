import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { loginReducer } from "./reducer/login.reducer";

export const store = configureStore({
    reducer: {
        loginReducer,
    },
    middleware:[...getDefaultMiddleware()]
});