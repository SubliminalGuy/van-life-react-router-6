import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Vans, { loader as vansLoader } from './pages/Vans/Vans'
import VanDetail, { loader as vanDetailLoader } from './pages/Vans/VanDetail'
import Layout from './components/Layout'
import HostLayout from './components/HostLayout'
import Error from './components/Error'
import { requireAuth } from './utils'

import Dashboard from './pages/Host/Dashboard'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/Reviews'
import HostVans, { loader as hostVanLoader } from './pages/Host/HostVans'
import HostVanDetail, {
    loader as hostVanDetailLoader,
} from './pages/Host/HostVanDetail'
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import HostVanPricing from './pages/Host/HostVanPricing'
import NotFound from './pages/NotFound'
import Login from './pages/Login'

import './index.css'
import './server'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route
                path="vans"
                element={<Vans />}
                loader={vansLoader}
                errorElement={<Error />}
            />
            <Route
                path="vans/:id"
                element={<VanDetail />}
                errorElement={<Error />}
                loader={vanDetailLoader}
            />

            <Route path="host" element={<HostLayout />}>
                <Route
                    index
                    element={<Dashboard />}
                    loader={async () => await requireAuth()}
                />
                <Route
                    path="income"
                    element={<Income />}
                    loader={async () => await requireAuth()}
                />
                <Route
                    path="reviews"
                    element={<Reviews />}
                    loader={async () => await requireAuth()}
                />
                <Route
                    path="vans"
                    element={<HostVans />}
                    loader={hostVanLoader}
                />
                <Route
                    path="vans/:id"
                    element={<HostVanDetail />}
                    loader={hostVanDetailLoader}
                >
                    <Route
                        index
                        element={<HostVanInfo />}
                        loader={async () => await requireAuth()}
                    />
                    <Route
                        path="photos"
                        element={<HostVanPhotos />}
                        loader={async () => await requireAuth()}
                    />
                    <Route
                        path="pricing"
                        element={<HostVanPricing />}
                        loader={async () => await requireAuth()}
                    />
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Route>
    )
)

function App() {
    return <RouterProvider router={router}></RouterProvider>
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
