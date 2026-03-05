'use client'

import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'
import { createClient } from '@/lib/supabase'
import { useState } from 'react'

interface QuickUpdateProps {
  initialOffering: string
  initialSeeking: string
  onSave?: () => void
}

export const QuickUpdate: React.FC<QuickUpdateProps> = ({
  initialOffering,
  initialSeeking,
  onSave,
}) => {
  const [offering, setOffering] = useState(initialOffering)
  const [seeking, setSeeking] = useState(initialSeeking)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { show: showToast } = useToast()

  const handleSave = async () => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offering, seeking }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save')
      }

      setShowSuccess(true)
      showToast('Updated!', 'success')
      onSave?.()

      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save'
      setError(message)
      showToast(message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Update</h2>

      <div className="space-y-4">
        <Textarea
          label="Offering right now"
          value={offering}
          onChange={(e) => setOffering(e.target.value)}
          maxLength={280}
          disabled={isLoading}
          rows={3}
        />

        <Textarea
          label="Seeking right now"
          value={seeking}
          onChange={(e) => setSeeking(e.target.value)}
          maxLength={280}
          disabled={isLoading}
          rows={3}
        />

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="flex items-center gap-3">
          <Button
            onClick={handleSave}
            loading={isLoading}
            disabled={isLoading}
          >
            Save quick update
          </Button>
          {showSuccess && (
            <span className="text-emerald-600 text-sm font-medium">
              ✓ Saved
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
