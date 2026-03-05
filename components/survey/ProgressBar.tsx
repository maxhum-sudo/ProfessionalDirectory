'use client'

import React from 'react'

type Step = 1 | 2 | 3 | 4 | 5

interface ProgressBarProps {
  currentStep: Step
}

const stepLabels: Record<Step, string> = {
  1: 'Basics',
  2: 'Role',
  3: 'Your World',
  4: 'Offers & Asks',
  5: 'Connect',
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const steps: Step[] = [1, 2, 3, 4, 5]

  return (
    <div className="flex flex-col items-center">
      {/* Progress line and dots */}
      <div className="flex items-center gap-2 mb-3 w-full max-w-xs">
        {steps.map((step, idx) => (
          <React.Fragment key={step}>
            {/* Dot */}
            <div
              className={`
                w-3 h-3 rounded-full flex-shrink-0 transition-colors
                ${
                  step < currentStep
                    ? 'bg-indigo-600'
                    : step === currentStep
                      ? 'bg-indigo-600'
                      : 'bg-gray-300'
                }
              `}
            />

            {/* Line connecting dots (except after last dot) */}
            {idx < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-0.5 transition-colors
                  ${
                    step < currentStep
                      ? 'bg-indigo-600'
                      : 'bg-gray-300'
                  }
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step labels */}
      <div className="flex justify-between w-full max-w-xs text-xs font-medium">
        {steps.map((step) => (
          <div
            key={step}
            className={`
              text-center transition-colors
              ${
                step <= currentStep
                  ? 'text-indigo-600'
                  : 'text-gray-500'
              }
            `}
          >
            {stepLabels[step]}
          </div>
        ))}
      </div>
    </div>
  )
}
