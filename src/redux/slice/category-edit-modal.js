import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    IDArray: [],
    NamesArray: [],
    noChild: false,
};

const categoryEditModalSlice = createSlice({
    name: "category-modal",
    initialState: initialState,
    reducers: {
        toggleCategoryModalClickHandler: (state) => {
            state.isOpen = !state.isOpen;
        },
        setIDArray: (state, action) => {
            state.IDArray = action.payload;
        },
        setNamesArray: (state, action) => {
            state.NamesArray = action.payload;
        },
        setNoChildren: (state, action) => {
            state.noChild = action.payload;
        },
    },
});

export const CategoryEditModalActions = categoryEditModalSlice.actions;
export default categoryEditModalSlice.reducer;
