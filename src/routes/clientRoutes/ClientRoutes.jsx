import React from "react"
import { Routes, Route } from "react-router-dom"
const ClientRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<div>This is client side.</div>} />
        </Routes>
    )
}
export default ClientRoutes;