const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    isEducationalModalOpen: false,
    isGovtJobModalOpen: false,
    isServiceModalOpen: false,
    serviceModalFunc: {
        func: null,
        id: null
    },
    govJobModalFunc: {
        func: null,
        id: null
    },
    eduFormModalFunc: {
        func: null,
        id: null
    }
}

const AdminSlice = createSlice({
    name: "AdminUseCase",
    initialState,
    reducers: {
        onEducationalModalOpen: (state) => {
            state.isEducationalModalOpen = true
        },
        onEducationalModalClose: (state) => {
            state.isEducationalModalOpen = false
        },
        onGovtJobModalOpen: (state) => {
            state.isGovtJobModalOpen = true
        },
        onGovtJobModalClose: (state) => {
            state.isGovtJobModalOpen = false
        },
        onServiceModalOpen: (state) => {
            state.isServiceModalOpen = true
        },
        onServiceModalClose: (state) => {
            state.isServiceModalOpen = false
        },
        updateServiceModalFunc: (state, action) => {
            state.serviceModalFunc = action.payload
        },
        updateGovJobModalFunc: (state, action) => {
            state.govJobModalFunc = action.payload
        },
        updateEduFormModalFunc: (state, action) => {
            state.eduFormModalFunc = action.payload
        }
    }
});

export const { onEducationalModalOpen, onEducationalModalClose, onGovtJobModalOpen, onGovtJobModalClose, onServiceModalOpen, onServiceModalClose, updateServiceModalFunc, updateGovJobModalFunc, updateEduFormModalFunc } = AdminSlice.actions
export default AdminSlice.reducer;