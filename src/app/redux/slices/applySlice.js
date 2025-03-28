const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    isAddServiceModalOpen: false,
    isConfirmationModalOpen: false,
    confirmModalData: {
        serviceRequestId: null,
        type: null,
    },
    applyModalData: {
        serviceId: null,
        subServiceId: null,
        serviceType: null,
        serviceData: null
    }
}

const ApplySlice = createSlice({
    name: "ApplyServiceUseCase",
    initialState,
    reducers: {
        onAddServiceModalOpen: (state) => {
            state.isAddServiceModalOpen = true
        },
        onAddServiceModalClose: (state) => {
            state.isAddServiceModalOpen = false
        },
        onConfirmationModalOpen: (state) => {
            state.isConfirmationModalOpen = true
        },
        onConfirmationModalClose: (state) => {
            state.isConfirmationModalOpen = false
        },
        updateApplyModalData: (state, action) => {
            state.applyModalData = action.payload
        },
        updateConfirmModalData: (state, action) => {
            state.confirmModalData = action.payload
        }
    }
});

export const { onAddServiceModalOpen, onAddServiceModalClose, onConfirmationModalOpen, onConfirmationModalClose, updateApplyModalData, updateConfirmModalData } = ApplySlice.actions
export default ApplySlice.reducer;