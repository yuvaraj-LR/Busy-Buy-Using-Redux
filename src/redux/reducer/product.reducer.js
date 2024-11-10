import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { auth, db } from "../../firebase/firebase.init";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const INITIAL_STATE = {
    data: [

    ],
    cartPriceCount: 0
}

export const getInitialProductState = createAsyncThunk(
    "product/getInitialProductState",
    (arg, thunkAPI) => {
        auth.onAuthStateChanged(async(user) => {
            if(user) {
                const docRef = doc(db, "BusyBuy", user?.uid);

                // Set up a real-time listener using onSnapshot
                const unsubscribe = onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();

                        thunkAPI.dispatch(productActions.setInitialProductState(data));

                        let priceCount = 0;
                        data?.cartItem?.forEach(item => {
                            priceCount += (item.count * item.price)
                        });
                        thunkAPI.dispatch(productActions.setCartPriceCount(priceCount));
                    } else {
                        console.log("No such document!");
                    }
                }, (error) => {
                    console.error("Error fetching document: ", error);
                });
            
                return () => unsubscribe();
            }
        })
    }
)

export const handleAddCartAsync = createAsyncThunk(
    "product/addCart",
    async (arg, thunkAPI) => {
        try {
            const { data, cardData } = arg;
            const { userdata, cartItem, orderedItem } = data;
            
            // Clone the cart items array to ensure it's mutable
            let updatedCartItem = cartItem ? cartItem.map(item => ({ ...item })) : [];

            // Find the index of the product in the cart
            let productIndex = updatedCartItem.findIndex(item => item.id === cardData.id);

            // If product exists, update the count, otherwise add it to the cart
            if (productIndex !== -1) {
                updatedCartItem[productIndex] = { 
                    ...updatedCartItem[productIndex], 
                    count: updatedCartItem[productIndex].count + 1 
                };
                toast("Item Count Increased.");
            } else {
                // Create a new copy of cardData with count property set to 1
                const newCardData = { ...cardData, count: 1 };
                updatedCartItem.push(newCardData);
                toast("Cart Item Added.");
            }

            let updatedData = {
                userdata: userdata,
                cartItem: updatedCartItem,
                orderedItem: orderedItem || []
            };
            console.log(updatedData, "upDataa...");

            // Update the data in Firestore
            await setDoc(doc(db, "BusyBuy", userdata.uid), updatedData);
            thunkAPI.dispatch(productActions.setInitialProductState(updatedData));
        } catch (error) {
            console.log(error, "error");
            toast.error("Cart Item Failed to add.");
        }
    }
);


const productSlice = createSlice({
    name: "product",
    initialState: INITIAL_STATE,
    reducers: {
        getCartProceCount: (state, action) => {
            return state.cartPriceCount;
        },
        setCartPriceCount: (state, action) => {
            state.cartPriceCount = action.payload;
        },
        setInitialProductState: (state, action) => {
            console.log(action.payload, "loadd...");
            state.data = action.payload;
        },
        addItemToCart: (state, action) => {
            console.log(state.data, "dataa....");
        }
    }
})

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
export const productSelector = (state) => state.productReducer;