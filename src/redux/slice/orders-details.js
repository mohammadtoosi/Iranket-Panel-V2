import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpen: false, orderId: "", stateOrderId: "" };

const ordersDetailsSlice = createSlice({
    name: "orders-details",
    initialState: initialState,
    reducers: {
        toggleOrderDetailsDialog: (state) => {
            state.isOpen = !state.isOpen;
        },
        setOrderIdHandler: (state, action) => {
            state.orderId = action.payload;
        },
    },
});

export const OrderDetailsActions = ordersDetailsSlice.actions;
export default ordersDetailsSlice.reducer;
