'use client'

import React from 'react'
import { Textarea } from '@/components/ui/Textarea'

interface Step4OffersAsksProps {
  fields: {
    offering: string
    seeking: string
  }
  errors: {
    offering?: string
    seeking?: string
  }
  onChange: (field: 'offering' | 'seeking', value: string) => void
}

export default function Step4OffersAsks({
  fields,
  errors,
  onChange,
}: Step4OffersAsksProps) {
  // Clamp text to maxLength
  const handleChange = (field: 'offering' | 'seeking', value: string) => {
    const clamped = value.slice(0, 280)
    onChange(field, clamped)
  }

  return (
    <div className="space-y-6">
      {/* Intro copy block */}
      <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
        <p className="text-sm text-indigo-900">
          These are the most-read fields in the directory. Be honest and specific — this is what gets you conversations.
        </p>
      </div>

      {/* Offering textarea */}
      <Textarea
        label="What can people come to you for?"
        placeholder="e.g. 'Intro calls with SaaS founders, fractional product work, co-founder conversations'"
        value={fields.offering}
        onChange={(e) => handleChange('offering', e.target.value)}
        maxLength={280}
        error={errors.offering}
        rows={3}
      />

      {/* Seeking textarea */}
      <Textarea
        label="What are you hoping to find in this network?"
        placeholder="e.g. 'Pre-seed deals in climate tech, a great ops hire, or just a coffee with other founders'"
        value={fields.seeking}
        onChange={(e) => handleChange('seeking', e.target.value)}
        maxLength={280}
        error={errors.seeking}
        rows={3}
      />
    </div>
  )
}
