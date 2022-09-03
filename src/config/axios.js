import Axios from "axios"

// const token = localStorage.getItem("token")
//     ? localStorage.getItem("token")
//     : null

const instance = Axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${token}`
    }
})

export default instance
