import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpen: false, editId: "", images: [] };

const productEditSlice = createSlice({
    name: "edit=product",
    initialState: initialState,
    reducers: {
        toggleProductEditDialog: (state) => {
            state.isOpen = !state.isOpen;
        },
        setEditId: (state, action) => {
            state.editId = action.payload;
        },
        setImages: (state, action) => {
            state.images = action.payload;
        },
    },
});

export const ProductEditActions = productEditSlice.actions;
export default productEditSlice.reducer;
