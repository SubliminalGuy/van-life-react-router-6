import {
    useLoaderData,
    redirect,
    Form,
    useActionData,
    useNavigation,
} from 'react-router-dom'
import { loginUser } from '../api'

export function loader({ request }) {
    return new URL(request.url).searchParams.get('message')
}

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    const pathname =
        new URL(request.url).searchParams.get('redirectTo') || '/host'

    try {
        await loginUser({ email, password })
        localStorage.setItem('loggedin', true)
        return redirect(pathname, { replace: true })
    } catch (err) {
        console.log('error', err.message)
        return err.message
    }
}

export default function Login() {
    const message = useLoaderData()
    const errorMessage = useActionData()
    const navigation = useNavigation()

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h3 className="red">{message}</h3>}
            {errorMessage && <h3 className="red">{errorMessage}</h3>}
            <Form replace method="post" className="login-form">
                <input name="email" type="email" placeholder="Email address" />
                <input name="password" type="password" placeholder="Password" />
                <button disabled={navigation.state === 'submitting'}>
                    {navigation.state === 'submitting'
                        ? 'Logging In'
                        : 'Log in'}
                </button>
            </Form>
        </div>
    )
}
