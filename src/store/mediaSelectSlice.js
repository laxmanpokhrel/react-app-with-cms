import { createSlice, current } from "@reduxjs/toolkit";
import isExistInArray from "../utils/isExistsInArray";
const mediaSelectSlice = createSlice({
    name: "mediaSelect",
    initialState: {
        list: [],
    },
    reducers: {
        addSelectedItem(state, action) {
            switch (action.payload.mode) {
                case "single":
                    state.list = [action.payload.media]
                    break;
                case "multiple":
                    const { status, index } = isExistInArray(current(state.list), action.payload.media);
                    if (!status) state.list.push(action.payload.media)
                default:
                    (() => { })()
            }

        },
        deleteSelectedItem(state, action) {
            switch (action.payload.mode) {
                case "single":
                    state.list = []
                    break;
                case "multiple":
                    const index = isExistInArray(current(state.list), action.payload.media).index;
                    if (index >= 0) {
                        let temp = state.list;
                        temp.splice(index, 1);
                        state.list = [...temp];
                    }
                    break;
                default:
                    (() => { })()
            }
        },
        initializeList(state, action) {
            state.list = []
        },
        fillSelectedMedia(state, action) {
            state.list = JSON.parse(action.payload);
        },
    }
})
export default mediaSelectSlice;
