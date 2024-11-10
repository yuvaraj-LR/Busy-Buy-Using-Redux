import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { loginReducer } from "./reducer/login.reducer";
import { productReducer } from "./reducer/product.reducer";

export const store = configureStore({
    reducer: {
        loginReducer,
        productReducer
    },
    middleware:[...getDefaultMiddleware()]
});