'use client'

import { Input } from '@/components/ui/Input'
import React, { useEffect, useState } from 'react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value)

  // Debounced onChange
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue)
    }, 200)

    return () => clearTimeout(timer)
  }, [localValue, onChange])

  const handleClear = () => {
    setLocalValue('')
  }

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>
      <Input
        type="text"
        placeholder="Search by name, role, or keyword..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="pl-10 pr-10"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      )}
    </div>
  )
}
