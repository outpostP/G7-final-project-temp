import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:8000/";

const initialState = {
  dataUser: [],
};

export const EmployeeReducer = createSlice({
  name: "EmployeeReducer",
  initialState,
  reducers: {
    addDataUser: (state, action) => {
      state.dataUser = action.payload;
    },
  },
});

export const getAllCashier = () => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}profile/allcashier?sort=ASC`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addDataUser(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const { addDataUser } = EmployeeReducer.actions;
export default EmployeeReducer.reducer;
