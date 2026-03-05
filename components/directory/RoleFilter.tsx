'use client'

import { Role, ROLES } from '@/types'
import React from 'react'

interface RoleFilterProps {
  activeRole: Role | null
  onChange: (role: Role | null) => void
}

export const RoleFilter: React.FC<RoleFilterProps> = ({
  activeRole,
  onChange,
}) => {
  const handleClick = (role: Role | null) => {
    if (activeRole === role) {
      // Clicking active role deselects it
      onChange(null)
    } else {
      // Clicking inactive role selects it
      onChange(role)
    }
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 pb-2 min-w-min">
        {/* All Roles button */}
        <button
          onClick={() => onChange(null)}
          className={`
            rounded-full px-3 py-1 text-sm font-medium border whitespace-nowrap
            transition-colors
            ${
              activeRole === null
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-300'
            }
          `}
        >
          All Roles
        </button>

        {/* Role buttons */}
        {ROLES.map((role) => (
          <button
            key={role}
            onClick={() => handleClick(role)}
            className={`
              rounded-full px-3 py-1 text-sm font-medium border whitespace-nowrap
              transition-colors
              ${
                activeRole === role
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-300'
              }
            `}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  )
}
