'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import { Role } from '@/types'
import ProgressBar from '@/components/survey/ProgressBar'
import Step1Basics from '@/components/survey/Step1Basics'
import Step2Role from '@/components/survey/Step2Role'
import Step3Domains from '@/components/survey/Step3Domains'
import Step4OffersAsks from '@/components/survey/Step4OffersAsks'
import Step5Contact from '@/components/survey/Step5Contact'
import ReviewScreen from '@/components/survey/ReviewScreen'

type CurrentStep = 1 | 2 | 3 | 4 | 5 | 'review'

interface SurveyFields {
  name: string
  headline: string
  avatar_file: File | null
  avatar_preview: string | null
  role: Role | null
  domains: string[]
  offering: string
  seeking: string
  contact_link: string
  in_directory: boolean
  opted_in: boolean
}

type SurveyErrors = Partial<Record<keyof SurveyFields, string>>

const defaultFields: SurveyFields = {
  name: '',
  headline: '',
  avatar_file: null,
  avatar_preview: null,
  role: null,
  domains: [],
  offering: '',
  seeking: '',
  contact_link: '',
  in_directory: true,
  opted_in: false,
}

export default function SurveyClient() {
  const router = useRouter()
  const { show: showToast } = useToast()

  const [currentStep, setCurrentStep] = useState<CurrentStep>(1)
  const [fields, setFields] = useState<SurveyFields>(defaultFields)
  const [errors, setErrors] = useState<SurveyErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (field: keyof SurveyFields, value: any) => {
      setFields((prev) => ({
        ...prev,
        [field]: value,
      }))
      // Clear error for this field when user starts editing
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[field]
          return newErrors
        })
      }
    },
    [errors]
  )

  const validateStep = (step: CurrentStep): boolean => {
    const newErrors: SurveyErrors = {}

    if (step === 1) {
      if (!fields.name.trim()) {
        newErrors.name = 'Full name is required'
      } else if (fields.name.length < 2 || fields.name.length > 80) {
        newErrors.name = 'Full name must be 2–80 characters'
      }

      if (!fields.headline.trim()) {
        newErrors.headline = 'Headline is required'
      } else if (fields.headline.length < 10 || fields.headline.length > 100) {
        newErrors.headline = 'Headline must be 10–100 characters'
      }
    }

    if (step === 2) {
      if (!fields.role) {
        newErrors.role = 'Please select a role'
      }
    }

    if (step === 3) {
      if (fields.domains.length === 0) {
        newErrors.domains = 'Please select at least one domain'
      }
    }

    if (step === 4) {
      if (!fields.offering.trim()) {
        newErrors.offering = 'What you offer is required'
      } else if (fields.offering.length < 10 || fields.offering.length > 280) {
        newErrors.offering = 'Offering must be 10–280 characters'
      }

      if (!fields.seeking.trim()) {
        newErrors.seeking = 'What you seek is required'
      } else if (fields.seeking.length < 10 || fields.seeking.length > 280) {
        newErrors.seeking = 'Seeking must be 10–280 characters'
      }
    }

    if (step === 5) {
      const trimmed = fields.contact_link.trim()
      if (!trimmed) {
        newErrors.contact_link = 'Contact link is required'
      } else {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
        if (isEmail) {
          setFields((prev) => ({ ...prev, contact_link: `mailto:${trimmed}` }))
        } else if (
          !trimmed.startsWith('https://') &&
          !trimmed.startsWith('http://') &&
          !trimmed.startsWith('mailto:')
        ) {
          newErrors.contact_link = 'Please enter a URL or email address'
        }
      }

      if (!fields.in_directory && !fields.opted_in) {
        // If hiding from directory, opted_in doesn't need to be true
      } else if (fields.in_directory && !fields.opted_in) {
        newErrors.opted_in = 'You must agree to appear in the directory to continue'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return
    }

    if (currentStep === 5) {
      setCurrentStep('review')
    } else if (currentStep === 1) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      setCurrentStep(3)
    } else if (currentStep === 3) {
      setCurrentStep(4)
    } else if (currentStep === 4) {
      setCurrentStep(5)
    }
  }

  const handleBack = () => {
    if (currentStep === 'review') {
      setCurrentStep(5)
    } else if (currentStep === 2) {
      setCurrentStep(1)
    } else if (currentStep === 3) {
      setCurrentStep(2)
    } else if (currentStep === 4) {
      setCurrentStep(3)
    } else if (currentStep === 5) {
      setCurrentStep(4)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      let avatarUrl: string | null = null

      // Upload avatar if present
      if (fields.avatar_file) {
        const formData = new FormData()
        formData.append('image', fields.avatar_file)

        const uploadResponse = await fetch('/api/avatar/upload', {
          method: 'POST',
          body: formData,
        })

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json()
          avatarUrl = uploadData.url
        } else {
          // Log error but don't block submission
          console.error('Avatar upload failed')
        }
      }

      // Submit survey
      const response = await fetch('/api/survey/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fields.name,
          headline: fields.headline,
          role: fields.role,
          domains: fields.domains,
          offering: fields.offering,
          seeking: fields.seeking,
          contact_link: fields.contact_link,
          in_directory: fields.in_directory,
          avatar_url: avatarUrl,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        showToast(error.error || 'Failed to complete survey', 'error')
        return
      }

      showToast("You're in! Welcome to the directory.", 'success')
      router.push('/directory')
    } catch (error) {
      console.error('Submission error:', error)
      showToast('An error occurred. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Basics
            fields={{
              name: fields.name,
              headline: fields.headline,
              avatar_file: fields.avatar_file,
              avatar_preview: fields.avatar_preview,
            }}
            errors={{
              name: errors.name,
              headline: errors.headline,
            }}
            onChange={handleChange}
          />
        )
      case 2:
        return (
          <Step2Role
            fields={{ role: fields.role }}
            errors={{ role: errors.role }}
            onChange={handleChange}
          />
        )
      case 3:
        return (
          <Step3Domains
            fields={{ domains: fields.domains }}
            errors={{ domains: errors.domains }}
            onChange={handleChange}
          />
        )
      case 4:
        return (
          <Step4OffersAsks
            fields={{ offering: fields.offering, seeking: fields.seeking }}
            errors={{
              offering: errors.offering,
              seeking: errors.seeking,
            }}
            onChange={handleChange}
          />
        )
      case 5:
        return (
          <Step5Contact
            fields={{
              contact_link: fields.contact_link,
              opted_in: fields.opted_in,
              in_directory: fields.in_directory,
            }}
            errors={{
              contact_link: errors.contact_link,
              opted_in: errors.opted_in,
            }}
            onChange={handleChange}
          />
        )
      case 'review':
        return (
          <ReviewScreen
            fields={fields}
            onBack={handleBack}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        {currentStep !== 'review' && <ProgressBar currentStep={currentStep} />}

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          {renderStep()}

          {currentStep !== 'review' && (
            <div className="flex gap-3 mt-8">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 1}
                fullWidth
              >
                ← Back
              </Button>
              <Button
                variant="primary"
                onClick={handleNext}
                fullWidth
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
