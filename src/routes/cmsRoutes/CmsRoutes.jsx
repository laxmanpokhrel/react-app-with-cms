import React, { useEffect, Suspense } from "react"
import { Routes, Route } from "react-router-dom"

const Dashboard = React.lazy(() => import("../../pages/cms/dashboard/Dashboard"))
const AddFaq = React.lazy(() => import("../../pages/cms/faqPanel/FaqPanel"))
const ViewFaq = React.lazy(() => import("../../pages/cms/faqPanel/ViewFaq"))
const FaqCategoryPanel = React.lazy(() => import("../../pages/cms/faqPanel/FaqCategoryPanel"))
const Media = React.lazy(() => import("../../pages/cms/Media/Media"))

const PageNotFound = React.lazy(() => import("../../pages/404"))

const CmsRoutes = (params) => {
    return (
        <Suspense fallback={<h3>Loading...</h3>}>
            <Routes>
                <Route path="/" element={<Dashboard />} />

                <Route path="/addFaq" element={<AddFaq />} />
                <Route path="/viewFaq" element={<ViewFaq />} />
                <Route path="/editFaq/:faqId" element={<AddFaq editMode />} />

                <Route path="/faqCategoryPanel" element={<FaqCategoryPanel />} />
                <Route path="/faqCategoryPanel/:faqCategoryId" element={<FaqCategoryPanel editMode />} />

                <Route path="/media" element={<Media />} />

                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
    )
}
export default CmsRoutes