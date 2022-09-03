import { createSlice } from "@reduxjs/toolkit";
const dashboardSlice = createSlice({
    name: "drawer",
    initialState: {
        content: null,
    },
    reducers: {
        addContent(state, action) {
            state.content = action.payload;
        },
        resetContent(state, action) {
            state.content = null;
        }
    }
})
export default dashboardSlice;
