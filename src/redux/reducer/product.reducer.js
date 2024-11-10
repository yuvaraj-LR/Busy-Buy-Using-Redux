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
            console.log(user, "userr...");
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
            // Update the data in Firestore
            await setDoc(doc(db, "BusyBuy", userdata.uid), {
                userdata: userdata,
                cartItem: updatedCartItem,
                orderedItem: orderedItem || []
            });

            thunkAPI.dispatch(productActions.setInitialProductState({
                userdata: userdata,
                cartItem: updatedCartItem,
                orderedItem: orderedItem || []
            }));
        } catch (error) {
            console.log(error, "error");
            toast.error("Cart Item Failed to add.");
        }
    }
);

export const handleSubCartAsync = createAsyncThunk(
    "product/subCart",
    async (arg, thunkAPI) => {
        try {
            const { data, cardData } = arg;
            const { userdata, cartItem, orderedItem } = data;

            // Clone the cart items array to ensure it's mutable
            let updatedCartItem = cartItem ? cartItem.map(item => ({ ...item })) : [];

            // Find the index of the product in the cart
            let productIndex = updatedCartItem.findIndex(item => item.id === cardData.id);

            // If product exists in the cart
            if (productIndex !== -1) {
                const item = updatedCartItem[productIndex];

                if (item.count > 1) {
                    // Decrement count if it's greater than 1
                    updatedCartItem[productIndex] = { 
                        ...item, 
                        count: item.count - 1 
                    };
                    toast("Item Count Decreased.");
                } else {
                    // If count is 1, remove the item from the cart
                    updatedCartItem.splice(productIndex, 1);
                    toast("Item Removed from Cart.");
                }
            } else {
                // If product is not in the cart, show a warning
                toast.warning("Item not found in cart.");
            }

            // Update the data in Firestore
            await setDoc(doc(db, "BusyBuy", userdata.uid), {
                userdata: userdata,
                cartItem: updatedCartItem,
                orderedItem: orderedItem || []
            });

            // Update the Redux state
            thunkAPI.dispatch(productActions.setInitialProductState({
                userdata: userdata,
                cartItem: updatedCartItem,
                orderedItem: orderedItem || []
            }));
        } catch (error) {
            console.log(error, "error");
            toast.error("Failed to remove item from cart.");
        }
    }
);

export const handleClearAll = createAsyncThunk(
    "product/clearAll",
    async (arg, thunkAPI) => {
        try {
            const { data } = arg;
            const { userdata, orderedItem } = data;
            
            await setDoc(doc(db, "BusyBuy", userdata.uid), {
                userdata: userdata,
                cartItem: [],
                orderedItem: orderedItem || []   
            });
        } catch (error) {
            console.log("Something went wrong.");
        }
    }
);

export const handleBuyNowAsync = createAsyncThunk(
    "buyNow/product", 
    async (arg, thunkAPI) => {
        try {
            const { data } = arg;
            const { userdata, cartItem, orderedItem } = data;

            let date = new Date();
            let getDate = date.toLocaleDateString();

            const order = {
                data: getDate,
                cartItem,
            }

            // Update the data.
            await setDoc(doc(db, "BusyBuy", userdata.uid), {
                userdata: userdata,
                cartItem: [],
                orderedItem: [order, ...orderedItem]
            });

            toast.success("Order Placed Successfully.")
        } catch (error) {
            console.log(error, "error in handle");
            toast.error("Order not placed successfully.")
        }
    }
)

const productSlice = createSlice({
    name: "product",
    initialState: INITIAL_STATE,
    reducers: {
        getCartPriceCount: (state, action) => {
            return state.cartPriceCount;
        },
        setCartPriceCount: (state, action) => {
            state.cartPriceCount = action.payload;
        },
        getInitialProductState: (state, action) => {
            return state.data;
        },
        setInitialProductState: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
export const productSelector = (state) => state.productReducer;