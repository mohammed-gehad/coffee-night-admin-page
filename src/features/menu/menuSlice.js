import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/server";
// import storage from "redux-persist/lib/storage";
const storage = window.localStorage;

export const getItems = createAsyncThunk("menu/getItems", async () => {
  const result = await api.get("/admin/items");
  return result.data;
});
export const addItem = createAsyncThunk(
  "menu/addItem",
  async ({ name, price, image }) => {
    const result = await api.post("/admin/items", { name, price, image });
    console.log(result);

    return result.data;
  }
);
export const removeItem = createAsyncThunk("menu/addItem", async ({ _id }) => {
  const result = await api.delete(`/admin/items/${_id}`);
  console.log(result);
  return result.data;
});

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
    loading: false,
    erorrMessage: "",
  },
  extraReducers: {
    [getItems.fulfilled]: (state, { payload }) => {
      state.items = payload;
    },
    [getItems.pending]: (state, { payload }) => {
      console.log(payload);
    },
    [getItems.rejected]: (state, { payload }) => {
      console.log("rejected");
    },
    [addItem.fulfilled]: (state, { payload }) => {
      state.items = payload;
    },
    [removeItem.fulfilled]: (state, { payload }) => {
      state.items = payload;
    },
  },
});

export default menuSlice.reducer;
