import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getCookie, setCookie } from "../../api/cookies";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.init";
import { toast } from "react-toastify";

let initialState = {
    isUserLoggedIn : getCookie("accessToken") ? true : false
};

// SignUp reducer.
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
            console.log(error.code, "codee...");

            return { success: false, error: error };
        }
    }
)

// SignIn Reducer.
export const handleSignInReducer = createAsyncThunk(
    "login/signin",
    async (args, thunkAPI) => {
        const { email, password } = args;

        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log(user, "userr...");

            setCookie("accessToken", user.accessToken, 7);

            // Set User Login to true.
            thunkAPI.dispatch(loginActions.setUserLoggedIn(true));
        } catch (error) {
            console.log(error.code, "codeee...");

            return { success: false, error: error };
        }
    }
);

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