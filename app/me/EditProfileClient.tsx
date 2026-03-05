'use client'

import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Tag } from '@/components/ui/Tag'
import TagInput from '@/components/ui/TagInput'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'
import { QuickUpdate } from '@/components/profile/QuickUpdate'
import { createClient } from '@/lib/supabase'
import {
  DOMAIN_SUGGESTIONS,
  ROLE_COLORS,
  ROLES,
  Profile,
  Role,
} from '@/types'
import { useState, useRef } from 'react'

interface EditProfileClientProps {
  profile: Profile
}

export const EditProfileClient: React.FC<EditProfileClientProps> = ({
  profile: initialProfile,
}) => {
  const [profile, setProfile] = useState(initialProfile)
  const [isSaving, setIsSaving] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { show: showToast } = useToast()

  const handleInputChange = (field: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file is an image
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', 'error')
      return
    }

    setSelectedFile(file)

    // Show preview
    const reader = new FileReader()
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const uploadAvatar = async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/avatar/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload avatar')
      }

      const data = await response.json()
      return data.avatar_url
    } catch (err) {
      console.error('Avatar upload failed:', err)
      return null
    }
  }

  const handleSaveAll = async () => {
    setIsSaving(true)

    try {
      let avatarUrl = profile.avatar_url

      // Upload new avatar if selected
      if (selectedFile) {
        const uploadedUrl = await uploadAvatar(selectedFile)
        if (!uploadedUrl) {
          showToast('Failed to upload avatar', 'error')
          setIsSaving(false)
          return
        }
        avatarUrl = uploadedUrl
      }

      // Prepare update payload
      const updatePayload: Record<string, any> = {
        name: profile.name,
        headline: profile.headline,
        role: profile.role,
        domains: profile.domains,
        offering: profile.offering,
        seeking: profile.seeking,
        contact_link: profile.contact_link,
        in_directory: profile.in_directory,
      }

      if (selectedFile || avatarUrl) {
        updatePayload.avatar_url = avatarUrl
      }

      const response = await fetch('/api/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload),
      })

      if (!response.ok) {
        const data = await response.json()
        if (data.errors) {
          Object.entries(data.errors).forEach(([field, error]) => {
            showToast(`${field}: ${error}`, 'error')
          })
        } else {
          showToast(data.error || 'Failed to save profile', 'error')
        }
        setIsSaving(false)
        return
      }

      const result = await response.json()
      setProfile(result.profile)
      setSelectedFile(null)
      setPreviewImage(null)
      showToast('Profile updated', 'success')
    } catch (err) {
      showToast('Failed to save profile', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <Button
            onClick={handleSaveAll}
            loading={isSaving}
            disabled={isSaving}
            size="md"
          >
            Save all changes
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
          {/* Quick Update Section */}
          <QuickUpdate
            initialOffering={profile.offering}
            initialSeeking={profile.seeking}
            onSave={() => {
              // Optionally refresh profile data
            }}
          />

          {/* Profile Details Section */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Profile Details
            </h2>

            <div className="space-y-6">
              {/* Name */}
              <Input
                label="Name"
                value={profile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={isSaving}
              />

              {/* Headline */}
              <Textarea
                label="Headline"
                value={profile.headline}
                onChange={(e) => handleInputChange('headline', e.target.value)}
                maxLength={150}
                disabled={isSaving}
                rows={2}
              />

              {/* Photo */}
              <div>
                <label className="text-sm font-medium text-gray-900 block mb-3">
                  Photo
                </label>
                <div className="flex items-center gap-4">
                  <Avatar
                    src={previewImage || profile.avatar_url}
                    name={profile.name}
                    size="md"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSaving}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Replace photo
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isSaving}
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="text-sm font-medium text-gray-900 block mb-3">
                  Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ROLES.map((role) => (
                    <button
                      key={role}
                      onClick={() => handleInputChange('role', role)}
                      disabled={isSaving}
                      className={`p-3 text-sm font-medium rounded-lg transition-all text-left ${
                        profile.role === role
                          ? `${ROLE_COLORS[role]} ring-2 ring-offset-2 ring-indigo-500`
                          : `${ROLE_COLORS[role]} opacity-50 hover:opacity-70`
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Domains */}
              <div>
                <label className="text-sm font-medium text-gray-900 block mb-3">
                  Domains (max 5)
                </label>
                <TagInput
                  value={profile.domains}
                  onChange={(domains) =>
                    handleInputChange('domains', domains)
                  }
                  suggestions={DOMAIN_SUGGESTIONS}
                  max={5}
                  placeholder="Add a domain..."
                />
              </div>

              {/* Contact Link */}
              <Input
                label="Contact Link"
                type="url"
                value={profile.contact_link}
                onChange={(e) =>
                  handleInputChange('contact_link', e.target.value)
                }
                placeholder="https://..."
                disabled={isSaving}
              />
            </div>
          </div>

          {/* Directory Visibility Section */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Directory Visibility
            </h2>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={profile.in_directory}
                onChange={(e) =>
                  handleInputChange('in_directory', e.target.checked)
                }
                disabled={isSaving}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-colors"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Show me in the member directory
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Uncheck to hide your profile without deleting it.
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
