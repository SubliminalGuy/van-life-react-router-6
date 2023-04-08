import { useState, Suspense } from 'react'
import {
    Link,
    useSearchParams,
    useLoaderData,
    defer,
    Await,
} from 'react-router-dom'
import { getVans } from '../../api'

export function loader() {
    return defer({ vans: getVans() })
}

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [error, setError] = useState(null)
    const dataPromise = useLoaderData()

    const typeFilter = searchParams.get('type')

    function handleFilterChange(key, value) {
        setSearchParams((prevParams) => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button
                    onClick={() => handleFilterChange('type', 'simple')}
                    className={`van-type simple ${
                        typeFilter === 'simple' ? 'selected' : null
                    }`}
                >
                    Simple
                </button>
                <button
                    onClick={() => handleFilterChange('type', 'luxury')}
                    className={`van-type simple ${
                        typeFilter === 'luxury' ? 'selected' : null
                    }`}
                >
                    Luxury
                </button>
                <button
                    onClick={() => handleFilterChange('type', 'rugged')}
                    className={`van-type simple ${
                        typeFilter === 'rugged' ? 'selected' : null
                    }`}
                >
                    Rugged
                </button>
                <button
                    onClick={() => setSearchParams({})}
                    className="van-type clear-filters"
                >
                    Clear filter
                </button>
            </div>
            <Suspense fallback={<h1>Loading vans ...</h1>}>
                <Await resolve={dataPromise.vans}>
                    {(loadedVans) => {
                        const displayedVans = typeFilter
                            ? loadedVans.filter(
                                  (van) => van.type === typeFilter
                              )
                            : loadedVans

                        const vanElements = displayedVans.map((van) => (
                            <div key={van.id} className="van-tile">
                                <Link
                                    to={van.id}
                                    state={{
                                        search: `?${searchParams.toString()}`,
                                        type: typeFilter,
                                    }}
                                >
                                    <img src={van.imageUrl} alt={van.name} />
                                    <div className="van-info">
                                        <h3>{van.name}</h3>
                                        <p>
                                            ${van.price}
                                            <span>/day</span>
                                        </p>
                                    </div>
                                    <i
                                        className={`van-type ${van.type} selected`}
                                    >
                                        {van.type}
                                    </i>
                                </Link>
                            </div>
                        ))

                        return (
                            <>
                                <div className="van-list">{vanElements}</div>
                            </>
                        )
                    }}
                </Await>
            </Suspense>
        </div>
    )
}
