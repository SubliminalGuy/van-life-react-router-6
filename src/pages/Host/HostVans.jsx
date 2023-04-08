import { Suspense } from 'react'
import { Link, useLoaderData, defer, Await } from 'react-router-dom'
import { getHostVans } from '../../api'
import { requireAuth } from '../../utils'

export async function loader({ request }) {
    await requireAuth(request)
    return defer({ hostVans: getHostVans() })
}

export default function HostVans() {
    const dataPromise = useLoaderData()

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                <Suspense fallback={<h1>Loading vans ...</h1>}>
                    <Await resolve={dataPromise.hostVans}>
                        {(vans) => {
                            const hostVansEls = vans.map((van) => (
                                <Link
                                    to={van.id}
                                    key={van.id}
                                    className="host-van-link-wrapper"
                                >
                                    <div
                                        className="host-van-single"
                                        key={van.id}
                                    >
                                        <img
                                            src={van.imageUrl}
                                            alt={`${van.name}`}
                                        />
                                        <div className="host-van-info">
                                            <h3>{van.name}</h3>
                                            <p>${van.price}/day</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                            return <section>{hostVansEls}</section>
                        }}
                    </Await>
                </Suspense>
            </div>
        </section>
    )
}
