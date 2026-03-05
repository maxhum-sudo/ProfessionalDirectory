'use client'

import React from 'react'
import { ROLES, Role } from '@/types'

interface Step2RoleProps {
  fields: {
    role: Role | null
  }
  errors: {
    role?: string
  }
  onChange: (field: 'role', value: Role) => void
}

export default function Step2Role({
  fields,
  errors,
  onChange,
}: Step2RoleProps) {
  return (
    <div className="space-y-6">
      {/* Heading and helper */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          What&apos;s your primary role?
        </h2>
        <p className="text-sm text-gray-600">
          Pick the one that best describes how you spend most of your working time.
        </p>
      </div>

      {/* Role cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ROLES.map((role) => (
          <button
            key={role}
            onClick={() => onChange('role', role)}
            className={`
              p-4 rounded-lg border-2 transition-all text-left font-medium text-sm
              ${
                fields.role === role
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                  : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
              }
            `}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Error message */}
      {errors.role && (
        <p className="text-sm text-red-600">
          {errors.role}
        </p>
      )}
    </div>
  )
}
