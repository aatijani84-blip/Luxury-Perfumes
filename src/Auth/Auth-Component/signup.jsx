import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { supabase } from '../supabase'

export function SignUp () {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [username, setUsername] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [error, setError] = useState('')
const [message, setMessage] = useState('')
const [loading, setLoading] = useState(false)

const navigate = useNavigate()

const handleSignUp = async e => {
e.preventDefault()

setError('')
setMessage('')

if (password !== confirmPassword) {
    setError('Passwords do not match.')
    return
}

if (password.length < 6) {
    setError('Password must be at least 6 characters.')
    return
}

setLoading(true)

const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
    data: {
        username: username.trim()
    }
    }
})

console.log('Signup data:', data)
console.log('Signup error:', error)

if (error) {
    setError(error.message)
    setLoading(false)
    return
}

if (!data.user) {
    setError('Unable to create account.')
    setLoading(false)
    return
}

setMessage('Account created successfully!')

setEmail('')
setPassword('')
setUsername('')
setConfirmPassword('')

setLoading(false)

navigate('/')
}

return (
<>
    <title>SIGN UP</title>

    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4'>
    <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-xl'>
        <h1 className='mb-2 text-center text-3xl font-bold text-gray-700'>
        Create Account
        </h1>

        <p className='mb-6 text-center text-gray-500'>Join Luxury Perfumes</p>

        {error && (
        <div className='mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-600'>
            {error}
        </div>
        )}

        {message && (
        <div className='mb-4 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-600'>
            {message}
        </div>
        )}

        <form onSubmit={handleSignUp} className='space-y-4'>
        <div>
            <label
            htmlFor='email'
            className='mb-1 block font-semibold text-gray-700'
            >
            Email
            </label>

            <input
            id='email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
            className='w-full rounded-lg border-2 border-gray-300 px-4 py-3 outline-none focus:border-amber-400'
            />
        </div>

        <div>
            <label
            htmlFor='username'
            className='mb-1 block font-semibold text-gray-700'
            >
            Username
            </label>

            <input
            id='username'
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder='Enter your username'
            required
            className='w-full rounded-lg border-2 border-gray-300 px-4 py-3 outline-none focus:border-amber-400'
            />
        </div>

        <div>
            <label
            htmlFor='password'
            className='mb-1 block font-semibold text-gray-700'
            >
            Password
            </label>

            <input
            id='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
            className='w-full rounded-lg border-2 border-gray-300 px-4 py-3 outline-none focus:border-amber-400'
            />
        </div>

        <div>
            <label
            htmlFor='confirmPassword'
            className='mb-1 block font-semibold text-gray-700'
            >
            Confirm Password
            </label>

            <input
            id='confirmPassword'
            type='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder='Confirm your password'
            required
            className='w-full rounded-lg border-2 border-gray-300 px-4 py-3 outline-none focus:border-amber-400'
            />
        </div>

        <button
            type='submit'
            disabled={loading}
            className='w-full rounded-lg bg-gray-600 px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50'
        >
            {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
        </form>

        <p className='mt-6 text-center text-gray-500'>
        Already have an account?{' '}
        <NavLink
            to='/Login'
            className='font-semibold text-amber-600 hover:underline'
        >
            Login
        </NavLink>
        </p>
    </div>
    </div>
</>
)
}
