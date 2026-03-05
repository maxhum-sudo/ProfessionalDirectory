'use client'

import React, { useRef } from 'react'
import { Input } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'

interface Step1BasicsProps {
  fields: {
    name: string
    headline: string
    avatar_file: File | null
    avatar_preview: string | null
  }
  errors: {
    name?: string
    headline?: string
  }
  onChange: (field: 'name' | 'headline' | 'avatar_file' | 'avatar_preview', value: any) => void
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export default function Step1Basics({
  fields,
  errors,
  onChange,
}: Step1BasicsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      // Show error by setting form error? For now just prevent upload
      console.error('File too large')
      return
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)

    onChange('avatar_file', file)
    onChange('avatar_preview', previewUrl)
  }

  return (
    <div className="space-y-6">
      {/* Photo upload */}
      <div className="flex flex-col items-center gap-4">
        <Avatar
          src={fields.avatar_preview}
          name={fields.name || 'Your Photo'}
          size="lg"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Upload photo
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Full name */}
      <Input
        label="Full name"
        placeholder="John Doe"
        value={fields.name}
        onChange={(e) => onChange('name', e.target.value)}
        error={errors.name}
      />

      {/* Headline */}
      <div>
        <Input
          label="One-line headline"
          placeholder="What do you do in one sentence? e.g. 'I build software products and invest in early-stage companies'"
          value={fields.headline}
          onChange={(e) => onChange('headline', e.target.value)}
          maxLength={100}
          error={errors.headline}
        />
        <p className="mt-1 text-xs text-gray-500">
          {fields.headline.length} / 100
        </p>
      </div>

      {/* Helper copy */}
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600">
          This is your first impression in the directory — make it specific enough that someone knows immediately whether they want to reach out.
        </p>
      </div>
    </div>
  )
}
