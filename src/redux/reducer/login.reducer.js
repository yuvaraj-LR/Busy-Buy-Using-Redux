import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getCookie, setCookie } from "../../api/cookies";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.init";
import { toast } from "react-toastify";
import { useEffect } from "react";

let initialState = {
    isUserLoggedIn: false
};


export const handleSignUpReducer = createAsyncThunk(
    "login/signUp",
    async (args, thunkAPI) => {
        const {name, email, password} = args;

        try {
            // Fire-auth connection.
            await createUserWithEmailAndPassword(auth, email, password);         
            const user = auth.currentUser;
            console.log(user, "userData...");   

            // Fire-store storage.
            if(user) {
                await setDoc(doc(db, "BusyBuy", user.uid), {
                    userdata: {
                        uid: user.uid,
                        name: name,
                        email: email,
                        password: password
                    },
                    cartItems: [],
                    orderedItems: [] 
                });
                console.log(user, "userDataa....");

                // Setting cookie.
                setCookie("accessToken", user.accessToken, 7);

                // Set User Login to true.
                thunkAPI.dispatch(loginActions.setUserLoggedIn(true));
            }
        } catch (error) {
            if(error.code === "auth/invalid-email" || error.code === "auth/email-already-in-use") {
                toast.error("This email is already in use by another account.");
            } else if (error.code === "auth/weak-password") {
                toast.error("Weak Password! Password should be more than 6 characters.");
            } else {
                toast.error("An unexpected error occurs.");
            }

            console.log(error.code, "errorrr...");

            return error;
        }
    }
)


const loginSlice = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        setUserLoggedIn: (state, action) => {
            state.isUserLoggedIn = !state.isUserLoggedIn;
        }
    }
})

export const loginReducer = loginSlice.reducer;
export const loginActions = loginSlice.actions;

export const loginSelector = (state) => state.loginReducer.isUserLoggedIn;