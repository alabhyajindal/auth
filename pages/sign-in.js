import { useState } from 'react'
import { supabase } from '../client'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function signIn() {
    const { error, data } = await supabase.auth.signIn({ email })

    if (error) {
      console.log(error)
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div>
        <h2>Please check your email for the Sign In link</h2>
      </div>
    )
  }

  return (
    <div className="signin-cont">
      <h2 className="heading">Sign In</h2>
      <div className="form-cont">
        <input className="form" onChange={(e) => setEmail(e.target.value)} />
        <button className="submit-btn" onClick={signIn}>
          Sign In
        </button>
      </div>
      <style jsx>{`
        .heading {
          font-size: 2rem;
        }

        .signin-cont {
          margin: 0 auto;
          max-width: 20rem;
          text-align: center;
        }

        .form-cont {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .submit-btn {
          max-width: 5rem;
          margin: 0 auto;
          padding: 5px 10px;
          border-radius: 3px;
        }

        .form {
          padding: 0.5rem;
          border: none;
          border-radius: 3px;
        }

        .form:focus {
          outline: none;
          border: none;
        }
      `}</style>
    </div>
  )
}
