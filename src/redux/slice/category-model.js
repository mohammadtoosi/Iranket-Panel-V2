import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    IDArray: [],
    NamesArray: [],
    noChild: false,
};

const categoryModalSlice = createSlice({
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

export const CategoryModalActions = categoryModalSlice.actions;
export default categoryModalSlice.reducer;
