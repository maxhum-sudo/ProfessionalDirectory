import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import React from 'react'

interface EmptyStateProps {
  type: 'no-filter-results' | 'no-search-results' | 'empty-directory'
  query?: string
  onClearFilters?: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  query,
  onClearFilters,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'no-filter-results':
        return (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gray-400"
          >
            <path d="M3 6h18" />
            <path d="M8 6v12" />
            <path d="M16 6v12" />
            <path d="M5 6l1.5 12a1 1 0 0 0 1 .9h8a1 1 0 0 0 1-.9L19 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
          </svg>
        )
      case 'no-search-results':
        return (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gray-400"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        )
      case 'empty-directory':
        return (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gray-400"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        )
    }
  }

  const getContent = () => {
    switch (type) {
      case 'no-filter-results':
        return {
          heading: 'No members match these filters',
          body: 'Try adjusting or clearing your filters.',
          button: (
            <Button
              variant="primary"
              size="md"
              onClick={onClearFilters}
            >
              Clear filters
            </Button>
          ),
        }
      case 'no-search-results':
        return {
          heading: `No members match "${query}"`,
          body: 'Try a different search term.',
          button: null,
        }
      case 'empty-directory':
        return {
          heading: 'The directory is empty',
          body: 'Be the first to complete your profile and join.',
          button: (
            <Link href="/me">
              <Button variant="primary" size="md">
                Go to my profile
              </Button>
            </Link>
          ),
        }
    }
  }

  const content = getContent()

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-4">{getIcon()}</div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        {content.heading}
      </h2>
      <p className="text-sm text-gray-600 mb-6">{content.body}</p>
      {content.button}
    </div>
  )
}
