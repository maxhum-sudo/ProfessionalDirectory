'use client'

import React from 'react'
import { DOMAIN_SUGGESTIONS } from '@/types'
import TagInput from '@/components/ui/TagInput'

interface Step3DomainsProps {
  fields: {
    domains: string[]
  }
  errors: {
    domains?: string
  }
  onChange: (field: string, value: string[]) => void
}

export default function Step3Domains({
  fields,
  errors,
  onChange,
}: Step3DomainsProps) {
  return (
    <div className="space-y-6">
      {/* Heading and helper */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          What worlds do you operate in?
        </h2>
        <p className="text-sm text-gray-600">
          Think about industries you serve, problems you understand deeply, or communities you're part of. Pick 1 to 5.
        </p>
      </div>

      {/* TagInput component */}
      <TagInput
        value={fields.domains}
        onChange={(domains) => onChange('domains', domains)}
        suggestions={DOMAIN_SUGGESTIONS}
        max={5}
        placeholder="Type to search or create a domain..."
      />

      {/* Error message */}
      {errors.domains && (
        <p className="text-sm text-red-600">
          {errors.domains}
        </p>
      )}
    </div>
  )
}
