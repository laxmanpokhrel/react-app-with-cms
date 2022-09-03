import { configureStore } from "@reduxjs/toolkit"
import pwpSlice from "./pwpSlice"
import mediaSlice from "./mediaSlice"
import drawerSlice from "./drawerSlice"
import faqSlice from "./faqSlice"
import faqCategorySlice from "./faqCategorySlice"
import mediaSelectSlice from "./mediaSelectSlice"
const store = configureStore({
    reducer: {
        pwp: pwpSlice.reducer,
        media: mediaSlice.reducer,
        drawer: drawerSlice.reducer,
        faq: faqSlice.reducer,
        faqCategory: faqCategorySlice.reducer,
        mediaSelect: mediaSelectSlice.reducer,
    }
});

export default store;
export const pwpActions = pwpSlice.actions
export const mediaActions = mediaSlice.actions
export const drawerActions = drawerSlice.actions
export const faqActions = faqSlice.actions
export const faqCategoryActions = faqCategorySlice.actions
export const mediaSelectActions = mediaSelectSlice.actions
