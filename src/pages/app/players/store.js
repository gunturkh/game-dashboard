import { createSlice } from "@reduxjs/toolkit";

export const appPlayerSlice = createSlice({
    name: "appplayer",
    initialState: {
        editPlayerItem: {},
        editPlayerModal: false,
    },
    reducers: {
        toggleEditPlayerModal: (state, action) => {
            state.editPlayerModal = action.payload;
        },
        setEditPlayerItem: (state, action) => {
            state.editPlayerModal = !state.editPlayerModal
            state.editPlayerItem = action.payload
        },
    },
})

export const {
    toggleEditPlayerModal,
    setEditPlayerItem
} = appPlayerSlice.actions

export default appPlayerSlice.reducer;