import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { useRouter } from 'next/router'

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    const user = supabase.auth.user()

    if (!user) {
      router.push('/sign-in')
    } else {
      setProfile(user)
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/sign-in')
  }

  if (!profile) return null
  return (
    <div className="cont">
      <h2>Hello, {profile.email}</h2>
      <p>User ID: {profile.id}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
