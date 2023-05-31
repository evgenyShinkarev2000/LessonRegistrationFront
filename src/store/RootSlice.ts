import { createSlice } from "@reduxjs/toolkit"
import { TokenManager } from "../services/TokenManager";
import { store } from ".";

const name = "root";
interface RootState
{

}
const initialState: RootState = {
  
};
const rootSlice = createSlice({
  name,
  initialState,
  reducers:{

  },
  extraReducers: (builder) => {

  }
});

export const rootReducer = rootSlice.reducer;
export const {} = rootSlice.actions;