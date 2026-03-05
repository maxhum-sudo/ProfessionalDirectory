import React from 'react'

interface TagProps {
  label: string
  color?: string
  onRemove?: () => void
  className?: string
}

export const Tag: React.FC<TagProps> = ({
  label,
  color = 'bg-gray-100 text-gray-800',
  onRemove,
  className = '',
}) => {
  return (
    <div
      className={`
        inline-flex items-center gap-2
        px-2.5 py-1.5 text-sm font-medium rounded-full
        ${color}
        ${className}
      `}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="inline-flex items-center justify-center p-0.5 ml-0.5 hover:opacity-70 transition-opacity"
          aria-label={`Remove ${label}`}
        >
          <span className="text-lg leading-none">×</span>
        </button>
      )}
    </div>
  )
}
