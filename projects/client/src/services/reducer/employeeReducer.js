import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:8000/";

const initialState = {
  dataUser: [],
  totalPage: 1,
  currentPage: 1,
};

export const EmployeeReducer = createSlice({
  name: "EmployeeReducer",
  initialState,
  reducers: {
    addDataUser: (state, action) => {
      state.dataUser = action.payload;
    },
    totalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    currentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const getAllCashier = (page) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}profile/allcashier?sort=ASC&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addDataUser(data.data));
      dispatch(totalPage(data.totalPages));
      dispatch(currentPage(page));
    } catch (err) {
      console.log(err);
    }
  };
};

export const { addDataUser, totalPage, currentPage } = EmployeeReducer.actions;
export default EmployeeReducer.reducer;
