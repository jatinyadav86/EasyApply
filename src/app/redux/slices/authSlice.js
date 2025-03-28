const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    isAuthenticationModalOpen: false,
    isCodeVerificationModalOpen: false,
    isRegisterModalWithPhoneOpen: false,
    isApplyModalOpen: false,
    userCredential: {
        name: '',
        phone: ''
    }
}

const AuthenticationSlice = createSlice({
    name: "Authetication",
    initialState,
    reducers: {
        onAuthenticationModalOpen: (state) => {
            state.isAuthenticationModalOpen = true
        },
        onAuthenticationModalClose: (state) => {
            state.isAuthenticationModalOpen = false
        },
        onRegisterModalWithPhoneOpen: (state) => {
            state.isRegisterModalWithPhoneOpen = true
        },
        onRegisterModalWithPhoneClose: (state) => {
            state.isRegisterModalWithPhoneOpen = false
        },
        onCodeVerificationModalOpen: (state) => {
            state.isCodeVerificationModalOpen = true
        },
        onCodeVerificationModalClose: (state) => {
            state.isCodeVerificationModalOpen = false
        },
        onApplyModalOpen: (state) => {
            state.isApplyModalOpen = true
        },
        onApplyModalClose: (state) => {
            state.isApplyModalOpen = false
        },
        addUserCredential: (state, action) => {
            state.userCredential = action.payload
        },
        resetUserCredential: (state) => {
            state.userCredential = {
                name: '',
                identifier: ''
            }
        }
    }
});

export const { onAuthenticationModalOpen, onAuthenticationModalClose, onRegisterModalWithPhoneOpen, onRegisterModalWithPhoneClose,  onCodeVerificationModalOpen, onCodeVerificationModalClose, onApplyModalOpen, onApplyModalClose, addUserCredential, resetUserCredential } = AuthenticationSlice.actions
export default AuthenticationSlice.reducer;