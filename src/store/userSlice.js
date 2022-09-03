import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addAuthenticatedUser(state, action) {
            state = action.payload
        },
        deleteAuthenticatedUser(state, action) {
            state = null
        }
    }
})
export default userSlice