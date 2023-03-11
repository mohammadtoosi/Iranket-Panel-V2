import { createSlice } from "@reduxjs/toolkit";

const initialState = { file: null, files: [], urls: [], edited: [] };

const filesSlice = createSlice({
    name: "files",
    initialState: initialState,
    reducers: {
        setFileHandler: (state, action) => {
            state.file = action.payload;
        },
        addFilesHandler: (state, action) => {
            state.files = action.payload;
        },
        setImageUrls: (state, action) => {
            state.urls = action.payload;
        },
        setEdited: (state, action) => {
            state.edited = action.payload;
        },
    },
});

export const FilesActions = filesSlice.actions;
export default filesSlice.reducer;
