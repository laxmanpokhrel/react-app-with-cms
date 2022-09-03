import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../config/axios";
import notification from "../components/notification";
import { faqActions } from ".";

export const postFaq = createAsyncThunk(
    "faq/postFaq",
    async (params, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post("/faq", params.formData);
            params.resetForm();
            dispatch(faqActions.addOneFaqToList(response.data.faq));
            return response.data.faq;
        } catch (e) {
            return rejectWithValue("Failed to post faq!");
        }
    }
);
export const changeIsPubishStatus = createAsyncThunk(
    "faq/changeIsPubishStatus",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get(`faq/changeIsPublish/${params._id}`);
            params.enableSwitch();
            return response.data.faq;
        } catch (err) {
            return rejectWithValue("Failed!");
        }

    }
)
export const deleteFaq = createAsyncThunk(
    "faq/deleteFaq",
    async (params, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.delete(`/faq/${params._id}`, params.formData);
            dispatch(faqActions.deleteFaq(response.data.faq));
            return response.data.faq;
        } catch (err) {
            return rejectWithValue("Failed to delete faq!");
        }
    }
);
export const getAllFaq = createAsyncThunk(
    "faq/getAllFaq",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get("/faq");
            return response.data.faq;
        } catch (err) {
            return rejectWithValue("Failed to load all faq!")
        }
    }
);
export const getOneFaq = createAsyncThunk(
    "faq/getOneFaq",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/faq/get/${params.faqId}`);
            params.fillForm(response.data.faq);
            return response.data.faq;
        } catch (err) {
            return rejectWithValue("Faied to load faq!");
        }
    }
);
export const putFaq = createAsyncThunk(
    "faq/putfaq",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.put("/faq", params.formData);
            params.navigate();
            return response.data.faq;
        } catch (err) {
            console.log(err)
            return rejectWithValue("Failed to update faq!");
        }
    }
);
export const searchFaq = createAsyncThunk(
    "faq/searchFaq",
    async (params, { rejectWithValue }) => {
        try {
            const response = axios.get(`/faq/search/:${params.searchKey}`);
            return (await response).data.faq;
        } catch (err) {
            return rejectWithValue("Not items found!");
        }
    }
)

const faqSlice = createSlice({
    name: "faq",
    initialState: {
        list: [],
       
    },
    reducers: {
        addOneFaqToList(state, action) {
            state.list = [action.payload, ...state.list];
        },
        deleteFaq(state, action) {
            !state.list.length ? (() => { })() : (() => {
                const objectIndex = current(state).list.findIndex(item => item._id === action.payload._id);
                objectIndex < 0 ? (() => { })() : state.list.splice(objectIndex, 1);
            })();
        },
       

    },
    extraReducers: {
        [postFaq.pending]: (state, action) => {
            notification("info", { message: "Working on it!" });
        },
        [postFaq.fulfilled]: (state, action) => {
            state.list = [action.payload, ...state.list];
            notification("success", { message: "Success.", description: "Faq saved successfully." });
        },
        [postFaq.rejected]: () => {
            notification("error", { message: "Error!", description: "Server error or validation error! " });
        },
        [putFaq.pending]: (state, action) => {
            notification("info", { message: "Updating Changes..." });
        },
        [putFaq.fulfilled]: (state, action) => {
            // state.list.push(action.payload)
            notification("success", { message: "Success.", description: "Faq Updated successfully." });
        },
        [putFaq.rejected]: () => {
            notification("error", { message: "Error!", description: "Server error or validation error! " });
        },
        [deleteFaq.pending]: (state, action) => {
            notification("info", { message: "Deleting...!" });
        },
        [deleteFaq.fulfilled]: (state, action) => {
            notification("success", { message: "Success.", description: "Faq Deleted successfully." });
        },
        [deleteFaq.rejected]: () => {
            notification("error", { message: "Error!", description: "Server error or validation error! " });
        },
        [changeIsPubishStatus.pending]: (state, action) => {
            // notification("info", { message: "Working on it!" });
        },
        [changeIsPubishStatus.fulfilled]: (state, action) => {
            notification("success", { message: "Success.", description: "Updated successfully." });
        },
        [changeIsPubishStatus.rejected]: () => {
            notification("error", { message: "Error!", description: "Server error or validation error! " });
        },
        [getAllFaq.pending]: (state, action) => {
            // notification("info", { message: "Working on it!" });
        },
        [getAllFaq.fulfilled]: (state, action) => {
            state.list = action.payload;
            // notification("success", { message: "Success.", description: "Fetched successfully." });
        },
        [getAllFaq.rejected]: () => {
            // notification("error", { message: "Error!", description: "Cannot fetch FAQs!" });
        },
        [getOneFaq.pending]: (state, action) => {
            // notification("info", { message: "Working on it!" });
        },
        [getOneFaq.fulfilled]: (state, action) => {
            state.list.push(action.payload)
            // notification("success", { message: "Success.", description: "Fetched successfully." });
        },
        [getOneFaq.rejected]: () => {
            notification("error", { message: "Error!", description: "Server error or validation error! " });
        },
        [searchFaq.pending]: (state, action) => {
            // notification("info", { message: "Working on it!" });
        },
        [searchFaq.fulfilled]: (state, action) => {
            state.list.push(action.payload)
            // notification("success", { message: "Success.", description: "" });
        },
        [searchFaq.rejected]: () => {
            notification("error", { message: "Error!", description: "No match found! " });
        },
    }
})
export default faqSlice;