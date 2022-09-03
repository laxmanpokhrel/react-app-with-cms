import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../config/axios";
import notification from "../components/notification";
import { mediaActions, drawerActions } from ".";
import parseFormData from "../utils/parseFormData";
import viewFormData from "../utils/viewFormData";

export const getAllMedia = createAsyncThunk(
    "media/getAllMedia",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get("/media");
            return (await response).data.media;
        } catch (err) {
            return rejectWithValue("Failed to get all media!");
        }
    }
);


export const postMedia = createAsyncThunk(
    "media/postMedia",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.post("/media", params.formData);
            params.resetForm();
            return response.data.media;
        } catch (err) {
            console.log(err);
            return rejectWithValue("Failed to save media!");
        }
    }
)

export const postMultipleMedia = createAsyncThunk(
    "media/postMultipleMedia",
    async (params, { rejectWithValue }) => {
        try {
            const response = Promise.all(params.formDataArray.map(async formData => {
                viewFormData(formData);
                return await axios.post("/media", formData)
            }))
            return (await response);
        } catch (err) {
            return rejectWithValue("Failed to save media!");
        }
    }
)

export const updateMedia = createAsyncThunk(
    "media/updateMedia",
    async (params, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.put("/media", params.formData);
            params.closeDrawer();
            dispatch(mediaActions.updateMedia(parseFormData(params.formData)));
            return response.data.media;
        } catch (err) {
            return rejectWithValue("Failed to update media!");
        }
    }
)

export const deleteMedia = createAsyncThunk(
    "media/deleteMedia",
    async (params, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.delete(`/media/${params._id}`);
            dispatch(mediaActions.deleteMedia({ _id: params._id }));
            params.closeDrawer();
            return response.data.media;
        } catch (err) {
            return rejectWithValue("Failed to update media!");
        }
    }
)

const mediaSlice = createSlice({
    name: "media",
    initialState: {
        list: []
    },
    reducers: {
        addMedia(state, action) {
            console.log("inside add media: ", action.payload)
            if (action.payload) {
                state.push(action.payload)
            }
        },
        updateMedia(state, action) {
            !state.list.length ? (() => { })() : (() => {
                const objectIndex = current(state).list.findIndex(item => item._id === action.payload._id);
                console.log(action.payload);
                console.log(objectIndex);
                objectIndex < 0 ? (() => { })() : state.list[objectIndex] = action.payload;
                console.log(state.list[objectIndex]);
            })();
        },
        deleteMedia(state, action) {
            !state.list.length ? (() => { })() : (() => {
                const objectIndex = current(state).list.findIndex(item => item._id === action.payload._id);
                objectIndex < 0 ? (() => { })() : state.list.splice(objectIndex, 1);
            })();
        }
    },
    extraReducers: {
        [getAllMedia.pending]: (state) => {
            notification("info", { message: "Info", description: "Working on it." });
        },
        [getAllMedia.fulfilled]: (state, { payload }) => {
            state.list = payload;
            notification("success", { message: "Success", description: "Media fetched successfully." });
        },
        [getAllMedia.rejected]: (state) => {
            notification("error", { message: "Error!", description: "Failed to load media!" });
        },
        [postMedia.pending]: (state, action) => {
            notification("info", { message: "Info", description: "Saving media." });
        },
        [postMedia.fulfilled]: (state, { payload }) => {
            const list = state.list;
            console.log(payload);
            const newList = [payload, ...list];
            state.list = newList;
            notification("success", { message: "Info", description: "Media saved successfully." });
        },
        [postMedia.rejected]: (state, action) => {
            notification("error", { message: "Error!", description: "Failed. Server or validation error." });
        },
        [updateMedia.pending]: (state, action) => {
            notification("info", { message: "Info", description: "Updating media." });
        },
        [updateMedia.fulfilled]: (state, action) => {
            notification("success", { message: "Info", description: "Media updated successfully." });
        },
        [updateMedia.rejected]: (state, action) => {
            notification("error", { message: "Error!", description: "Failed. Server or validation error." });
        },
        [deleteMedia.pending]: (state, action) => {
            notification("info", { message: "Info", description: "Deleting media." });
        },
        [deleteMedia.fulfilled]: (state, action) => {
            notification("success", { message: "Info", description: "Media deleted successfully." });
        },
        [deleteMedia.rejected]: (state, action) => {
            notification("error", { message: "Error!", description: "Failed. Server or validation error." });
        },
        [postMultipleMedia.pending]: (state, action) => {
            notification("info", { message: "Info", description: "Saving media." });
        },
        [postMultipleMedia.fulfilled]: (state, { payload }) => {
            payload.forEach((response => {
                state.list = [response.data.media, ...state.list];
            }))
            notification("success", { message: "Info", description: "Media saved successfully." });
        },
        [postMultipleMedia.rejected]: (state, action) => {
            notification("error", { message: "Error!", description: "Failed. Might be media error or server is not responding." });
        },
    }
})
export default mediaSlice