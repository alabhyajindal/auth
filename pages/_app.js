import '../styles/globals.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../client'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session)

        if (event === 'SIGNED_IN') {
          setIsAuthenticated(true)
          router.push('/profile')
        }
        if ((event = 'SIGNED_OUT')) {
          setIsAuthenticated(false)
        }
      }
    )
    checkUser()

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  async function checkUser() {
    const user = supabase.auth.user()
    if (user) {
      setIsAuthenticated(true)
    }
  }

  async function handleAuthChange(event, session) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }

  return (
    <div>
      <nav className="nav">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
        {!isAuthenticated && (
          <Link href="sign-in">
            <a>Sign In</a>
          </Link>
        )}
        <Link href="/protected">
          <a>Protected</a>
        </Link>
      </nav>
      <Component {...pageProps} />
      <style jsx>{`
        .nav {
          display: flex;
          gap: 1rem;
        }
      `}</style>
    </div>
  )
}

export default MyApp
