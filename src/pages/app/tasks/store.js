import { createSlice } from "@reduxjs/toolkit";

export const appTaskSlice = createSlice({
  name: "apptask",
  initialState: {
    openCardModal: false,
    isLoading: null,
    editCardModal: false,
    editCardItem: {},
  },
  reducers: {
    toggleAddCardModal: (state, action) => {
      state.openCardModal = action.payload;
    },
    toggleEditCardModal: (state, action) => {
      state.editCardModal = action.payload;
    },
    setEditCardItem: (state, action) => {
      state.editCardModal = !state.editCardModal
      state.editCardItem = action.payload
    },
  },
});

export const {
  toggleAddCardModal,
  toggleEditCardModal,
  setEditCardItem
} = appTaskSlice.actions;
export default appTaskSlice.reducer;
