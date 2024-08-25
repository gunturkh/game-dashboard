import { createSlice } from "@reduxjs/toolkit";

export const appLevelSlice = createSlice({
  name: "applevel",
  initialState: {
    openCardModal: false,
    isLoading: null,
    editCardModal: false,
  },
  reducers: {
    toggleAddCardModal: (state, action) => {
      state.openCardModal = action.payload;
    },
    toggleEditCardModal: (state, action) => {
      state.editCardModal = action.payload;
    },
  },
});

export const {
  toggleAddCardModal,
  toggleEditCardModal,
} = appLevelSlice.actions;
export default appLevelSlice.reducer;
