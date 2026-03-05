'use client'

import React from 'react'

interface DomainFilterProps {
  activeDomains: string[]
  availableDomains: string[]
  onChange: (domains: string[]) => void
}

export const DomainFilter: React.FC<DomainFilterProps> = ({
  activeDomains,
  availableDomains,
  onChange,
}) => {
  const handleClick = (domain: string) => {
    if (activeDomains.includes(domain)) {
      // Remove domain
      onChange(activeDomains.filter((d) => d !== domain))
    } else {
      // Add domain
      onChange([...activeDomains, domain])
    }
  }

  const handleClear = () => {
    onChange([])
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 pb-2 min-w-min items-center">
        {/* All Domains button */}
        <button
          onClick={() => onChange([])}
          className={`
            rounded-full px-3 py-1 text-sm font-medium border whitespace-nowrap
            transition-colors
            ${
              activeDomains.length === 0
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-300'
            }
          `}
        >
          All Domains
        </button>

        {/* Domain buttons */}
        {availableDomains.map((domain) => (
          <button
            key={domain}
            onClick={() => handleClick(domain)}
            className={`
              rounded-full px-3 py-1 text-sm font-medium border whitespace-nowrap
              transition-colors
              ${
                activeDomains.includes(domain)
                  ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-300'
              }
            `}
          >
            {domain}
          </button>
        ))}

        {/* Clear link */}
        {activeDomains.length > 0 && (
          <button
            onClick={handleClear}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium whitespace-nowrap ml-2"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
