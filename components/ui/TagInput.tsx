'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Tag } from '@/components/ui/Tag'

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  suggestions: string[]
  max: number
  placeholder: string
}

const titleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function TagInput({
  value,
  onChange,
  suggestions,
  max,
  placeholder,
}: TagInputProps) {
  const [input, setInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter suggestions as user types
  useEffect(() => {
    if (input.trim() === '') {
      setFilteredSuggestions([])
      return
    }

    const filtered = suggestions.filter(
      (s) =>
        s.toLowerCase().includes(input.toLowerCase()) &&
        !value.includes(s)
    )
    setFilteredSuggestions(filtered)
  }, [input, suggestions, value])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const addTag = (tag: string) => {
    const normalized = titleCase(tag)
    if (!value.includes(normalized) && value.length < max) {
      onChange([...value, normalized])
      setInput('')
      setFilteredSuggestions([])
    }
  }

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setIsOpen(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      if (input.trim()) {
        addTag(input.trim())
      }
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value[value.length - 1])
    }
  }

  const isFull = value.length >= max

  return (
    <div ref={containerRef} className="relative">
      {/* Tags display */}
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            onRemove={() => removeTag(tag)}
            color="bg-indigo-100 text-indigo-800"
          />
        ))}
      </div>

      {/* Input field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => input && setIsOpen(true)}
          placeholder={isFull ? 'Maximum reached' : placeholder}
          disabled={isFull}
          className={`
            w-full px-3 py-2 text-sm border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            transition-colors
            ${
              isFull
                ? 'border-gray-300 bg-gray-50'
                : 'border-gray-300 bg-white'
            }
          `}
        />

        {/* Dropdown suggestions */}
        {isOpen && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addTag(suggestion)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-indigo-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Helper text */}
      {isFull && (
        <p className="mt-1 text-xs text-gray-500">Maximum reached</p>
      )}
    </div>
  )
}
