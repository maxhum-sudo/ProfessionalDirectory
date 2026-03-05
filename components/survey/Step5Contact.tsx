'use client'

import React from 'react'
import { Input } from '@/components/ui/Input'

interface Step5ContactProps {
  fields: {
    contact_link: string
    opted_in: boolean
    in_directory: boolean
  }
  errors: {
    contact_link?: string
    opted_in?: string
  }
  onChange: (field: 'contact_link' | 'opted_in' | 'in_directory', value: any) => void
}

export default function Step5Contact({
  fields,
  errors,
  onChange,
}: Step5ContactProps) {
  const handleHideToggle = (checked: boolean) => {
    onChange('in_directory', !checked)
    if (checked) {
      // When hiding from directory, uncheck and disable primary consent
      onChange('opted_in', false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Contact link input */}
      <Input
        label="Where should people go to connect with you?"
        helpText="LinkedIn, Calendly, personal site, or email — your choice. This is the CTA on your profile."
        placeholder="https://linkedin.com/in/yourname"
        value={fields.contact_link}
        onChange={(e) => onChange('contact_link', e.target.value)}
        error={errors.contact_link}
      />

      {/* Primary consent checkbox */}
      <div className="flex items-start gap-3">
        <input
          id="opted_in"
          type="checkbox"
          checked={fields.opted_in && fields.in_directory}
          onChange={(e) => onChange('opted_in', e.target.checked)}
          disabled={!fields.in_directory}
          className="mt-1 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <label
          htmlFor="opted_in"
          className={`text-sm ${
            !fields.in_directory
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-gray-700 cursor-pointer'
          }`}
        >
          I agree to appear in the Calgary Coworking member directory, visible only to other members who have completed this survey.
        </label>
      </div>

      {errors.opted_in && (
        <p className="text-sm text-red-600">
          {errors.opted_in}
        </p>
      )}

      {/* Hide from directory checkbox */}
      <div className="flex items-start gap-3">
        <input
          id="in_directory"
          type="checkbox"
          checked={!fields.in_directory}
          onChange={(e) => handleHideToggle(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label
          htmlFor="in_directory"
          className="text-sm text-gray-700 cursor-pointer"
        >
          I&apos;d like to create an account but not appear in the directory yet. I can change this from my profile.
        </label>
      </div>
    </div>
  )
}
