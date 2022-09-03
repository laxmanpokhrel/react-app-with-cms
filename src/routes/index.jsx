import React, { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import CmsPanel from "../pages/cms/CmsPanel"
const ClientRoutes = React.lazy(() => import("./clientRoutes/ClientRoutes"))
const PageNotFound = React.lazy(() => import("../pages/404"))
const SiteRouter = () => {
    return (
        <Suspense fallback={<h3>Loading...</h3>}>
            <Routes>
                <Route path="/*" element={<ClientRoutes />} />
                <Route path="/admin/*" element={<CmsPanel />} />
                <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
        </Suspense>
    )
}
export default SiteRouter
