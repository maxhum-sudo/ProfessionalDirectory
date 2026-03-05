import React from 'react'
import Image from 'next/image'

interface AvatarProps {
  src?: string | null
  name?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: { width: 32, height: 32, textSize: 'text-xs' },
  md: { width: 56, height: 56, textSize: 'text-sm' },
  lg: { width: 96, height: 96, textSize: 'text-xl' },
}

// 8 muted Tailwind colors for deterministic background
const bgColors = [
  'bg-slate-200 text-slate-800',
  'bg-gray-200 text-gray-800',
  'bg-zinc-200 text-zinc-800',
  'bg-stone-200 text-stone-800',
  'bg-neutral-200 text-neutral-800',
  'bg-amber-100 text-amber-800',
  'bg-orange-100 text-orange-800',
  'bg-yellow-100 text-yellow-800',
]

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ')
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '?'
  return (parts[0][0] + parts[parts.length - 1][0])
    .toUpperCase()
}

const getBackgroundColor = (name: string): string => {
  const charCode = name.charCodeAt(0) || 0
  return bgColors[charCode % bgColors.length]
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = 'Unknown',
  size = 'md',
  className = '',
}) => {
  const config = sizeClasses[size]
  const initials = getInitials(name)
  const bgColor = getBackgroundColor(name)

  if (src) {
    return (
      <div
        className={`relative rounded-full overflow-hidden flex-shrink-0 ${className}`}
        style={{ width: config.width, height: config.height }}
      >
        <Image
          src={src}
          alt={name}
          width={config.width}
          height={config.height}
          className="object-cover w-full h-full"
        />
      </div>
    )
  }

  return (
    <div
      className={`
        rounded-full flex items-center justify-center flex-shrink-0
        font-bold ${config.textSize} ${bgColor}
        ${className}
      `}
      style={{ width: config.width, height: config.height }}
      title={name}
    >
      {initials}
    </div>
  )
}
