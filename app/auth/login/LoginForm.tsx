'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'
import { createClient } from '@/lib/supabase'
import { Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

type LoginState = 'idle' | 'loading' | 'sent' | 'error'

interface LoginFormProps {
  error?: string
}

export const LoginForm: React.FC<LoginFormProps> = ({ error: initialError }) => {
  const [loginState, setLoginState] = useState<LoginState>('idle')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { show: showToast } = useToast()

  // Handle initial error from URL
  useEffect(() => {
    if (initialError === 'expired') {
      setLoginState('idle')
      setErrorMessage('That link has expired. Enter your email to get a new one.')
    } else if (initialError === 'missing_code') {
      setLoginState('idle')
      setErrorMessage('Something went wrong. Please request a new link.')
    }
  }, [initialError])

  const validateEmail = (value: string): boolean => {
    if (!value.trim()) {
      setEmailError('Email is required')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address')
      return false
    }
    setEmailError('')
    return true
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (emailError) {
      validateEmail(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')

    if (!validateEmail(email)) {
      return
    }

    setLoginState('loading')
    const supabase = createClient()

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/verify`,
        },
      })

      if (error) {
        setLoginState('error')
        showToast('Something went wrong. Please try again.', 'error')
        setTimeout(() => setLoginState('idle'), 2000)
      } else {
        setLoginState('sent')
      }
    } catch (err) {
      setLoginState('error')
      showToast('Something went wrong. Please try again.', 'error')
      setTimeout(() => setLoginState('idle'), 2000)
    }
  }

  const handleStartOver = () => {
    setLoginState('idle')
    setEmail('')
    setEmailError('')
    setErrorMessage('')
  }

  if (loginState === 'sent') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-sm w-full">
          <div className="text-center">
            <Mail className="mx-auto h-12 w-12 text-indigo-600 mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Check your inbox
            </h1>
            <p className="text-gray-600 mb-8">
              We sent a link to <strong>{email}</strong>. It expires in 10 minutes.
            </p>
            <button
              onClick={handleStartOver}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              Wrong email? Start over
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-sm w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Sign in to Calgary Coworking
            </h1>
            <p className="text-gray-600">
              Enter your email and we&apos;ll send you a link to sign in or create
              your profile.
            </p>
          </div>

          {errorMessage && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">{errorMessage}</p>
            </div>
          )}

          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            disabled={loginState === 'loading'}
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            loading={loginState === 'loading'}
            disabled={loginState === 'loading'}
          >
            Send me a link
          </Button>

          <p className="text-xs text-gray-500 text-center">
            No account? You&apos;ll create one when you click the link.
          </p>
        </form>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </div>
    </div>
  )
}
