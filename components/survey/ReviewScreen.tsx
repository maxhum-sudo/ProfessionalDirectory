'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { Tag } from '@/components/ui/Tag'
import { ROLE_COLORS } from '@/types'

interface SurveyFields {
  name: string
  headline: string
  avatar_file: File | null
  avatar_preview: string | null
  role: any
  domains: string[]
  offering: string
  seeking: string
  contact_link: string
  in_directory: boolean
  opted_in: boolean
}

interface ReviewScreenProps {
  fields: SurveyFields
  onBack: () => void
  onSubmit: () => Promise<void>
  isSubmitting: boolean
}

export default function ReviewScreen({
  fields,
  onBack,
  onSubmit,
  isSubmitting,
}: ReviewScreenProps) {
  return (
    <div className="space-y-8">
      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-900 text-center">
        Here's how you'll appear in the directory
      </h2>

      {/* Hidden from directory banner */}
      {!fields.in_directory && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Your profile will be created but hidden from the directory. You can make it visible from your profile settings.
          </p>
        </div>
      )}

      {/* Member card preview */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
        {/* Avatar and basic info */}
        <div className="flex flex-col items-center text-center mb-6">
          <Avatar
            src={fields.avatar_preview}
            name={fields.name}
            size="lg"
            className="mb-4"
          />
          <h3 className="text-xl font-bold text-gray-900">
            {fields.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {fields.headline}
          </p>
        </div>

        {/* Role badge */}
        {fields.role && (
          <div className="flex justify-center mb-4">
            <Tag
              label={fields.role}
              color={ROLE_COLORS[fields.role] || 'bg-gray-100 text-gray-800'}
            />
          </div>
        )}

        {/* Domains */}
        {fields.domains.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Domains
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {fields.domains.map((domain) => (
                <Tag
                  key={domain}
                  label={domain}
                  color="bg-indigo-100 text-indigo-800"
                />
              ))}
            </div>
          </div>
        )}

        {/* Offering and Seeking */}
        <div className="space-y-4 mb-6 text-sm">
          {fields.offering && (
            <div>
              <p className="font-semibold text-gray-900 mb-1">
                I can help with:
              </p>
              <p className="text-gray-700">
                {fields.offering}
              </p>
            </div>
          )}

          {fields.seeking && (
            <div>
              <p className="font-semibold text-gray-900 mb-1">
                I'm looking for:
              </p>
              <p className="text-gray-700">
                {fields.seeking}
              </p>
            </div>
          )}
        </div>

        {/* Contact link CTA */}
        {fields.contact_link && (
          <div className="text-center pt-6 border-t border-slate-300">
            <a
              href={fields.contact_link}
              target={fields.contact_link.startsWith('mailto:') ? undefined : '_blank'}
              rel={fields.contact_link.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Connect
            </a>
          </div>
        )}
      </div>

      {/* Helper text */}
      <p className="text-center text-sm text-gray-600">
        You can edit any of this later from your profile.
      </p>

      {/* Action buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={isSubmitting}
          fullWidth
        >
          ← Back
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          fullWidth
        >
          Join the Directory
        </Button>
      </div>
    </div>
  )
}
