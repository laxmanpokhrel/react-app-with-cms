import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../config/axios";
import notification from "../components/notification";
import { faqCategoryActions } from ".";
import parseFormData from "../utils/parseFormData";

export const postFaqCategory = createAsyncThunk(
    "faqCategory/postFaqCategory",
    async (params, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post("/faqCategory", params.formData);
            dispatch(faqCategoryActions.addOneFaqCategoryToList(response.data.faqCategory))
            params.resetForm();
            return response.data.faqCategory;
        } catch (err) {
            return rejectWithValue("Failed to post faq category");
        }
    }
);

export const getAllFaqcategory = createAsyncThunk(
    "faqCategory/getAllFaqcategory",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get("/faqCategory")
            console.log(response.data)
            return response.data.faqCategory;
        } catch (err) {
            return rejectWithValue("Failed to load all faq category!");
        }
    }
);

export const getOneFaqCategory = createAsyncThunk(
    "faqCategory/getOneFaqcategory",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/faq/get/${params.faqcategoryId}`)
            return response.data.faqCategory;
        } catch (err) {
            return rejectWithValue("Failed to load faq category!");
        }
    }
);
export const putFaqcategory = createAsyncThunk(
    "faqCategory/putFaqcategory",
    async (params, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.put("/faqCategory", params.formData);
            const formData = parseFormData(params.formData);
            dispatch(faqCategoryActions.updateFaqCategory(formData));
            params.resetForm();
            return response.data.faqCategory;
        } catch (err) {
            console.log("err: ** ", err);
            return rejectWithValue("Failed to update faq catagory!");
        }
    }
);
export const deleteFaqcategory = createAsyncThunk(
    "faqCategory/deleteFaqcategory",
    async (params, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.delete(`/faqCategory/${params._id}`);
            dispatch(faqCategoryActions.deleteFaqCategory(response.data.faqCategory))
            return response.data.faqCategory;
        } catch (err) {
            return rejectWithValue("Failed to delete faq category!");
        }
    }
);
export const changeIsPubishStatus = createAsyncThunk(
    "faqCategory/changeIsPubishStatus",
    async (params, { rejectWithValue, dispatch }) => {
        try {
            console.log("_id: ", params._id)
            const response = await axios.get(`/faqCategory/changeIsPublish/${params._id}`);
            dispatch(faqCategoryActions.changeIsPublishStatus({ _id: params._id }))
            params.enableSwitch();
            return response.data.faqCategory;
        } catch (err) {
            return rejectWithValue("Failed!");
        }

    }
)
export const searchFaqCategory = createAsyncThunk(
    "faq/searchFaq",
    async (params, { rejectWithValue }) => {
        try {
            const response = axios.get(`/faqCategory/search/:${params.searchKey}`);
            return (await response).data.faq;
        } catch (err) {
            return rejectWithValue("Not items found!");
        }
    }
)
const faqCategorySlice = createSlice({
    name: "faqCategory",
    initialState: {
        list: [],
        editItem: null,
    },
    reducers: {
        addOneFaqCategoryToList(state, action) {
            state.list = [action.payload, ...state.list];
        },
        deleteFaqCategory(state, action) {
            !state.list.length ? (() => { })() : (() => {
                const objectIndex = current(state).list.findIndex(item => item._id === action.payload._id);
                objectIndex < 0 ? (() => { })() : state.list.splice(objectIndex, 1);
            })();
        },
        editItem(state, action) {
            console.log("action.payload: ", action.payload);
            state.editItem = action.payload;
        },
        initializeEditItem(state, action) {
            state.editItem = null;
        },
        updateFaqCategory(state, action) {
            const objectIndex = state.list.findIndex(item => item._id === action.payload._id);
            console.log("object Index: ", state.list[objectIndex].isPublish);
            objectIndex < 0 ? (() => { })() : (() => {
                state.list[objectIndex].category = action.payload.category;
                state.list[objectIndex].isPublish = action.payload.isPublish;
                state.list[objectIndex].displayOrder = action.payload.displayOrder;
            })()
        },
        changeIsPublishStatus(state, action) {
            const objectIndex = state.list.findIndex(item => item._id === action.payload._id);
            console.log("object Index: ", state.list[objectIndex].isPublish);
            objectIndex < 0 ? (() => { })() : (() => {
                state.list[objectIndex].isPublish = !state.list[objectIndex].isPublish;
            })()
        }
    },


    extraReducers: {
        [postFaqCategory.pending]: (state, action) => {
            // notification.close();
            notification("info", { message: "Working on it!" });
        },
        [postFaqCategory.fulfilled]: (state, action) => {
            notification("success", { message: "Success.", description: "Faq Category saved successfully." });
        },
        [postFaqCategory.rejected]: () => {
            notification("error", { message: "Error!", description: "Server error or validation error! " });
        },
        [putFaqcategory.pending]: (state, action) => {
            notification("info", { message: "Working on it!" });
        },
        [putFaqcategory.fulfilled]: (state, action) => {
            notification("success", { message: "Success.", description: "Faq Category Updated successfully." });
        },
        [putFaqcategory.rejected]: () => {
            notification("error", { message: "Error!", description: "Server error or validation error! " });
        },
        [deleteFaqcategory.pending]: (state, action) => {
            notification("info", { message: "Working on it!" });
        },
        [deleteFaqcategory.fulfilled]: (state, action) => {
            notification("success", { message: "Success.", description: "Faq Category Deleted successfully." });
        },
        [deleteFaqcategory.rejected]: () => {
            notification("error", { message: "Error!", description: "Server error or validation error! " });
        },
        [changeIsPubishStatus.pending]: (state, action) => {
            // notification("info", { message: "Working on it!" });
        },
        [changeIsPubishStatus.fulfilled]: (state, action) => {
            // state.list.push(action.payload);
            notification("success", { message: "Success.", description: "Updated successfully." });
        },
        [changeIsPubishStatus.rejected]: () => {
            notification("error", { message: "Error!", description: "Server error or validation error! " });
        },
        [getAllFaqcategory.pending]: (state, action) => {
            // notification("info", { message: "Working on it!" });
        },
        [getAllFaqcategory.fulfilled]: (state, { payload }) => {
            console.log("inside getAllFrequency fulfilled.", payload)
            state.list = payload;
            notification("success", { message: "Success.", description: "Fetched successfully." });
        },
        [getAllFaqcategory.rejected]: () => {
            notification("error", { message: "Error!", description: "Server error or validation error! " });
        },
        [getOneFaqCategory.pending]: (state, action) => {
            // notification("info", { message: "Working on it!" });
        },
        [getOneFaqCategory.fulfilled]: (state, action) => {
            state.list.push(action.payload)
            notification("success", { message: "Success.", description: "Fetched successfully." });
        },
        [getOneFaqCategory.rejected]: () => {
            notification("error", { message: "Error!", description: "Server error or validation error! " });
        },
        [searchFaqCategory.pending]: (state, action) => {
            // notification("info", { message: "Working on it!" });
        },
        [searchFaqCategory.fulfilled]: (state, action) => {
            state.list.push(action.payload)
            // notification("success", { message: "Success.", description: "" });
        },
        [searchFaqCategory.rejected]: () => {
            notification("error", { message: "Error!", description: "No match found! " });
        },
    }
})
export default faqCategorySlice;