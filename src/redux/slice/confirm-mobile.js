import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    showRegisterForm: false,
    showSellerForm: false,
    showPasswordForm: false,
    showOtpForm: false,
    shooLoginByOtp: false,
    showOTPLogin: false,
    otp: "",
};

const confirmMobileSlice = createSlice({
    name: "confirm-mobile",
    initialState: initialState,
    reducers: {
        toggleConfirmForm: (state) => {
            state.show = !state.show;
        },
        toggleRegisterForm: (state) => {
            state.showRegisterForm = !state.showRegisterForm;
        },
        toggleSellerForm: (state) => {
            state.showSellerForm = !state.showSellerForm;
        },
        togglePasswordForm: (state) => {
            state.showPasswordForm = !state.showPasswordForm;
        },
        toggleOtpForm: (state) => {
            state.showOtpForm = !state.showOtpForm;
        },
        toggleLoginByOtp: (state) => {
            state.showLoginByOtp = !state.showLoginByOtp;
        },
        toggleOTPLogin: (state) => {
            state.showOTPLogin = !state.showLoginByOtp;
        },
        setOtp: (state, action) => {
            state.otp = action.payload;
        },
    },
});

export const ConfirmActions = confirmMobileSlice.actions;

export default confirmMobileSlice.reducer;
