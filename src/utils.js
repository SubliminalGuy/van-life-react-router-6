import { redirect } from 'react-router-dom'

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem('loggedin')
    if (!isLoggedIn) {
        throw redirect(
            `/login?message=You must be logged in to view this page&redirectTo=${pathname}`
        )
    }
}
