import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";
import avatar1 from "@/assets/images/avatar/av-1.svg";
import avatar2 from "@/assets/images/avatar/av-2.svg";
import avatar3 from "@/assets/images/avatar/av-3.svg";
import avatar4 from "@/assets/images/avatar/av-4.svg";

export const appCardSlice = createSlice({
  name: "appcard",
  initialState: {
    openCardModal: false,
    openCategoryModal: false,
    isLoading: null,
    editItem: {},
    editModal: false,
    editCardModal: false,
    cards: [
      {
        id: uuidv4(),
        assignee: [
          {
            image: avatar1,
            label: "Mahedi Amin",
          },
          {
            image: avatar2,
            label: "Sovo Haldar",
          },
          {
            image: avatar3,
            label: "Rakibul Islam",
          },
        ],
        name: "Management Dashboard ",
        des: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
        startDate: "2022-10-03",
        endDate: "2022-10-06",
        progress: 75,
        category: [
          {
            value: "team",
            label: "team",
          },
          {
            value: "low",
            label: "low",
          },
        ],
      },
      {
        id: uuidv4(),
        assignee: [
          {
            image: avatar1,
            label: "Mahedi Amin",
          },
          {
            image: avatar2,
            label: "Sovo Haldar",
          },
          {
            image: avatar3,
            label: "Rakibul Islam",
          },
        ],
        name: "Business Dashboard ",
        des: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
        startDate: "2022-10-03",
        endDate: "2022-10-10",
        progress: 50,

        category: [
          {
            value: "team",
            label: "team",
          },
          {
            value: "low",
            label: "low",
          },
        ],
      },
    ],
  },
  reducers: {
    toggleAddModal: (state, action) => {
      state.openCategoryModal = action.payload;
    },
    toggleAddCardModal: (state, action) => {
      state.openCardModal = action.payload;
    },
    toggleEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    pushProject: (state, action) => {
      state.cards.unshift(action.payload);

      toast.success("Add Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    removeCard: (state, action) => {
      state.cards = state.cards.filter(
        (item) => item.id !== action.payload
      );
      toast.warning("Remove Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    updateCard: (state, action) => {
      // update project and  store it into editItem when click edit button

      state.editItem = action.payload;
      // toggle edit modal
      state.editModal = !state.editModal;
      // find index
      let index = state.cards.findIndex(
        (item) => item.id === action.payload.id
      );
      // update project
      state.cards.splice(index, 1, {
        id: action.payload.id,
        name: action.payload.name,
        des: action.payload.des,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        assignee: action.payload.assignee,
        progress: action.payload.progress,
        category: action.payload.category,
      });
    },
  },
});

export const {
  openModal,
  pushCard,
  toggleAddModal,
  toggleAddCardModal,
  removeCard,
  toggleEditModal,
  updateCard,
} = appCardSlice.actions;
export default appCardSlice.reducer;
