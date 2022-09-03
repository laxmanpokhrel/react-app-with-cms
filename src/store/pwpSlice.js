import { createSlice } from "@reduxjs/toolkit";
const pwpSlice = createSlice({
    name: "pwpSlice",
    initialState: {
        dirList: []
    },
    reducers: {
        changePwp(state, action) {
            state.dirList = action.payload;
        }
    }
})
export default pwpSlice;